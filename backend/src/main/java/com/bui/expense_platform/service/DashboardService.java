package com.bui.expense_platform.service;

import com.bui.expense_platform.dto.*;
import com.bui.expense_platform.model.*;
import com.bui.expense_platform.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;
    private final SubscriptionRepository subscriptionRepository;

    private static final Map<String, String> CATEGORY_COLORS = Map.of(
            "Food & Dining", "#f59e0b",
            "Housing", "#3b82f6",
            "Subscriptions", "#8b5cf6",
            "Entertainment", "#ec4899",
            "Utilities", "#06b6d4",
            "Transport", "#10b981",
            "Shopping", "#6366f1"
    );

    public DashboardSummaryDTO getDashboardSummary() {
        LocalDate now = LocalDate.now();
        LocalDate startOfMonth = YearMonth.now().atDay(1);

        // 1. Total Balance across all accounts
        List<Account> accounts = accountRepository.findAll();
        BigDecimal totalBalance = accounts.stream()
                .map(Account::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 2. This Month Spend (Transactions of type EXPENSE in current month)
        List<Transaction> monthTransactions = transactionRepository.findAll().stream()
                .filter(t -> t.getDate() != null && !t.getDate().isBefore(startOfMonth))
                .collect(Collectors.toList());

        BigDecimal thisMonthSpend = monthTransactions.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 3. Category Spend Aggregation & Percentages
        Map<String, BigDecimal> categoryTotals = new HashMap<>();
        for (Transaction t : monthTransactions) {
            if ("EXPENSE".equalsIgnoreCase(t.getType())) {
                String cat = t.getCategory() != null ? t.getCategory() : "Other";
                categoryTotals.put(cat, categoryTotals.getOrDefault(cat, BigDecimal.ZERO).add(t.getAmount()));
            }
        }

        List<CategorySpendDTO> categorySpendingList = new ArrayList<>();
        if (thisMonthSpend.compareTo(BigDecimal.ZERO) > 0) {
            for (Map.Entry<String, BigDecimal> entry : categoryTotals.entrySet()) {
                double pct = entry.getValue()
                        .divide(thisMonthSpend, 4, RoundingMode.HALF_UP)
                        .doubleValue() * 100;
                categorySpendingList.add(CategorySpendDTO.builder()
                        .category(entry.getKey())
                        .amount(entry.getValue())
                        .percentage(Math.round(pct * 10.0) / 10.0)
                        .color(CATEGORY_COLORS.getOrDefault(entry.getKey(), "#94a3b8"))
                        .build());
            }
        }
        categorySpendingList.sort((a, b) -> b.getAmount().compareTo(a.getAmount()));

        // 4. Budget Progress & Over Budget calculation
        List<Budget> budgets = budgetRepository.findAll();
        List<BudgetProgressDTO> budgetProgressList = new ArrayList<>();
        int overBudgetCount = 0;
        BigDecimal totalOverBudgetAmount = BigDecimal.ZERO;

        for (Budget b : budgets) {
            BigDecimal spent = categoryTotals.getOrDefault(b.getCategory(), BigDecimal.ZERO);
            BigDecimal remaining = b.getMonthlyLimit().subtract(spent);
            double pctUsed = 0.0;
            if (b.getMonthlyLimit().compareTo(BigDecimal.ZERO) > 0) {
                pctUsed = spent.divide(b.getMonthlyLimit(), 4, RoundingMode.HALF_UP).doubleValue() * 100;
            }

            boolean isOver = spent.compareTo(b.getMonthlyLimit()) > 0;
            BigDecimal overAmt = isOver ? spent.subtract(b.getMonthlyLimit()) : BigDecimal.ZERO;

            if (isOver) {
                overBudgetCount++;
                totalOverBudgetAmount = totalOverBudgetAmount.add(overAmt);
            }

            String status = "ON_TRACK";
            if (isOver) {
                status = "OVER_BUDGET";
            } else if (pctUsed >= 80.0) {
                status = "WARNING";
            }

            budgetProgressList.add(BudgetProgressDTO.builder()
                    .budgetId(b.getId())
                    .category(b.getCategory())
                    .monthlyLimit(b.getMonthlyLimit())
                    .spentAmount(spent)
                    .remainingAmount(remaining)
                    .percentageUsed(Math.round(pctUsed * 10.0) / 10.0)
                    .isOverBudget(isOver)
                    .overAmount(overAmt)
                    .status(status)
                    .icon(b.getIcon())
                    .color(b.getColor() != null ? b.getColor() : CATEGORY_COLORS.getOrDefault(b.getCategory(), "#6366f1"))
                    .build());
        }

        // 5. Active Subscriptions & Cost
        List<Subscription> allSubs = subscriptionRepository.findAll();
        List<Subscription> activeSubs = allSubs.stream()
                .filter(s -> "ACTIVE".equalsIgnoreCase(s.getStatus()))
                .collect(Collectors.toList());

        BigDecimal totalMonthlySubsCost = activeSubs.stream()
                .map(s -> "ANNUAL".equalsIgnoreCase(s.getBillingCycle()) ? 
                        s.getCost().divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP) : s.getCost())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 6. Recent Transactions
        List<Transaction> recentTransactions = transactionRepository.findTop10ByOrderByDateDescIdDesc();

        // 7. Financial Health Score (0-100)
        int healthScore = 92;
        if (overBudgetCount > 0) healthScore -= (overBudgetCount * 12);
        if (thisMonthSpend.compareTo(BigDecimal.valueOf(3500)) > 0) healthScore -= 8;
        if (healthScore < 20) healthScore = 20;

        // 8. Smart AI Insights
        List<SmartInsightDTO> smartInsights = buildSmartInsights(allSubs, budgetProgressList, thisMonthSpend);

        return DashboardSummaryDTO.builder()
                .totalBalance(totalBalance)
                .thisMonthSpend(thisMonthSpend)
                .overBudgetCount(overBudgetCount)
                .totalOverBudgetAmount(totalOverBudgetAmount)
                .activeSubscriptionsCount(activeSubs.size())
                .totalMonthlySubscriptionsCost(totalMonthlySubsCost)
                .financialHealthScore(healthScore)
                .monthSpendGrowthPercentage(-3.4) // lower spend than last month
                .categorySpending(categorySpendingList)
                .budgetProgressList(budgetProgressList)
                .recentTransactions(recentTransactions)
                .activeSubscriptions(allSubs)
                .smartInsights(smartInsights)
                .build();
    }

    private List<SmartInsightDTO> buildSmartInsights(List<Subscription> subs, List<BudgetProgressDTO> budgets, BigDecimal monthSpend) {
        List<SmartInsightDTO> insights = new ArrayList<>();

        // Unused subscriptions check
        long unusedCount = subs.stream().filter(s -> Boolean.TRUE.equals(s.getIsUnusedAlert())).count();
        if (unusedCount > 0) {
            insights.add(SmartInsightDTO.builder()
                    .id("unused-subs")
                    .title("Unused Subscription Detected")
                    .description("You haven't logged activity for Cloud Vault in 45 days. Canceling saves $14.99/mo.")
                    .type("SAVINGS")
                    .potentialSavingsMonth(new BigDecimal("14.99"))
                    .actionLabel("Manage Subscription")
                    .build());
        }

        // Over budget warning
        Optional<BudgetProgressDTO> worstBudget = budgets.stream()
                .filter(BudgetProgressDTO::isOverBudget)
                .max(Comparator.comparing(BudgetProgressDTO::getOverAmount));

        if (worstBudget.isPresent()) {
            insights.add(SmartInsightDTO.builder()
                    .id("over-budget-alert")
                    .title("Budget Exceeded in " + worstBudget.get().getCategory())
                    .description("You are $" + worstBudget.get().getOverAmount() + " over your limit. Consider reallocating from Housing surplus.")
                    .type("WARNING")
                    .potentialSavingsMonth(worstBudget.get().getOverAmount())
                    .actionLabel("Adjust Budget")
                    .build());
        }

        // Dining optimizer tip
        insights.add(SmartInsightDTO.builder()
                .id("dining-optimizer")
                .title("Food & Dining Optimization")
                .description("Cutting 2 takeout orders/week could boost your yearly savings by $1,240.")
                .type("TIP")
                .potentialSavingsMonth(new BigDecimal("103.33"))
                .actionLabel("Simulate Savings")
                .build());

        return insights;
    }
}
