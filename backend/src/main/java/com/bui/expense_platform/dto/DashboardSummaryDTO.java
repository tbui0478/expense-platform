package com.bui.expense_platform.dto;

import com.bui.expense_platform.model.Subscription;
import com.bui.expense_platform.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryDTO {
    // Top 4 Metrics
    private BigDecimal totalBalance;
    private BigDecimal thisMonthSpend;
    private int overBudgetCount;
    private BigDecimal totalOverBudgetAmount;
    private int activeSubscriptionsCount;
    private BigDecimal totalMonthlySubscriptionsCost;

    // Financial Health & Trends
    private int financialHealthScore; // 0 to 100
    private double monthSpendGrowthPercentage;

    // Charts & Progress Breakdown
    private List<CategorySpendDTO> categorySpending;
    private List<BudgetProgressDTO> budgetProgressList;
    private List<Transaction> recentTransactions;
    private List<Subscription> activeSubscriptions;

    // Smart Features
    private List<SmartInsightDTO> smartInsights;
}
