package com.bui.expense_platform.config;

import com.bui.expense_platform.model.*;
import com.bui.expense_platform.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            log.info("Seeding initial demo user data...");
            userRepository.save(User.builder()
                    .fullName("Alex Morgan")
                    .email("demo@expentrack.com")
                    .password("password123")
                    .build());
        }
        if (accountRepository.count() == 0) {
            log.info("Seeding initial accounts data...");
            accountRepository.saveAll(List.of(
                    Account.builder().name("Main Checking").accountType("CHECKING").balance(new BigDecimal("12450.00")).currency("USD").accountNumberLast4("4821").build(),
                    Account.builder().name("High Yield Savings").accountType("SAVINGS").balance(new BigDecimal("24800.00")).currency("USD").accountNumberLast4("9012").build(),
                    Account.builder().name("Apex Credit Card").accountType("CREDIT_CARD").balance(new BigDecimal("-1250.00")).currency("USD").accountNumberLast4("3341").build()
            ));
        }

        if (budgetRepository.count() == 0) {
            log.info("Seeding initial budgets data...");
            budgetRepository.saveAll(List.of(
                    Budget.builder().category("Food & Dining").monthlyLimit(new BigDecimal("600.00")).icon("Utensils").color("#f59e0b").build(),
                    Budget.builder().category("Housing").monthlyLimit(new BigDecimal("1800.00")).icon("Home").color("#3b82f6").build(),
                    Budget.builder().category("Subscriptions").monthlyLimit(new BigDecimal("120.00")).icon("Tv").color("#8b5cf6").build(),
                    Budget.builder().category("Entertainment").monthlyLimit(new BigDecimal("250.00")).icon("Film").color("#ec4899").build(),
                    Budget.builder().category("Utilities").monthlyLimit(new BigDecimal("300.00")).icon("Zap").color("#06b6d4").build(),
                    Budget.builder().category("Transport").monthlyLimit(new BigDecimal("200.00")).icon("Car").color("#10b981").build()
            ));
        }

        if (subscriptionRepository.count() == 0) {
            log.info("Seeding initial subscriptions data...");
            LocalDate today = LocalDate.now();
            subscriptionRepository.saveAll(List.of(
                    Subscription.builder().name("Netflix 4K").category("Entertainment").cost(new BigDecimal("19.99")).billingCycle("MONTHLY").nextBillingDate(today.plusDays(3)).status("ACTIVE").providerIcon("Film").isUnusedAlert(false).build(),
                    Subscription.builder().name("Spotify Family").category("Entertainment").cost(new BigDecimal("16.99")).billingCycle("MONTHLY").nextBillingDate(today.plusDays(12)).status("ACTIVE").providerIcon("Music").isUnusedAlert(false).build(),
                    Subscription.builder().name("ChatGPT Plus").category("Subscriptions").cost(new BigDecimal("20.00")).billingCycle("MONTHLY").nextBillingDate(today.plusDays(7)).status("ACTIVE").providerIcon("Cpu").isUnusedAlert(false).build(),
                    Subscription.builder().name("AWS Cloud Infra").category("Utilities").cost(new BigDecimal("45.00")).billingCycle("MONTHLY").nextBillingDate(today.plusDays(18)).status("ACTIVE").providerIcon("Server").isUnusedAlert(false).build(),
                    Subscription.builder().name("Equinox Fitness").category("Health").cost(new BigDecimal("55.00")).billingCycle("MONTHLY").nextBillingDate(today.plusDays(25)).status("ACTIVE").providerIcon("Activity").isUnusedAlert(false).build(),
                    Subscription.builder().name("Cloud Vault Pro").category("Subscriptions").cost(new BigDecimal("14.99")).billingCycle("MONTHLY").nextBillingDate(today.plusDays(2)).status("ACTIVE").providerIcon("Cloud").isUnusedAlert(true).build()
            ));
        }

        if (transactionRepository.count() == 0) {
            log.info("Seeding initial transactions data...");
            LocalDate today = LocalDate.now();
            transactionRepository.saveAll(List.of(
                    Transaction.builder().title("Organic Grocery Market").amount(new BigDecimal("142.50")).type("EXPENSE").category("Food & Dining").date(today.minusDays(1)).merchant("Whole Foods").paymentMethod("Apex Credit Card").isRecurring(false).notes("Weekly groceries").build(),
                    Transaction.builder().title("Monthly Rent").amount(new BigDecimal("1800.00")).type("EXPENSE").category("Housing").date(today.minusDays(2)).merchant("Skyline Apartments").paymentMethod("Main Checking").isRecurring(true).notes("August Rent").build(),
                    Transaction.builder().title("Gourmet Sushi Dinner").amount(new BigDecimal("188.40")).type("EXPENSE").category("Food & Dining").date(today.minusDays(3)).merchant("Nobu").paymentMethod("Apex Credit Card").isRecurring(false).notes("Team dinner").build(),
                    Transaction.builder().title("Tech Salary Deposit").amount(new BigDecimal("4850.00")).type("INCOME").category("Income").date(today.minusDays(4)).merchant("Acme Corp").paymentMethod("Main Checking").isRecurring(true).notes("Direct Deposit").build(),
                    Transaction.builder().title("Netflix 4K Subscription").amount(new BigDecimal("19.99")).type("EXPENSE").category("Entertainment").date(today.minusDays(5)).merchant("Netflix").paymentMethod("Apex Credit Card").isRecurring(true).notes("Recurring monthly").build(),
                    Transaction.builder().title("Artisan Bakery").amount(new BigDecimal("34.20")).type("EXPENSE").category("Food & Dining").date(today.minusDays(6)).merchant("Blue Bottle").paymentMethod("Apex Credit Card").isRecurring(false).notes("Coffee & pastries").build(),
                    Transaction.builder().title("Supermarket Essentials").amount(new BigDecimal("248.10")).type("EXPENSE").category("Food & Dining").date(today.minusDays(7)).merchant("Trader Joe's").paymentMethod("Main Checking").isRecurring(false).notes("Groceries").build(),
                    Transaction.builder().title("City Metro Card Pass").amount(new BigDecimal("127.00")).type("EXPENSE").category("Transport").date(today.minusDays(8)).merchant("MTA Transit").paymentMethod("Apex Credit Card").isRecurring(true).notes("Monthly pass").build(),
                    Transaction.builder().title("Electric & Power Co").amount(new BigDecimal("145.80")).type("EXPENSE").category("Utilities").date(today.minusDays(9)).merchant("ConEd").paymentMethod("Main Checking").isRecurring(true).notes("Utility bill").build(),
                    Transaction.builder().title("Concert Tickets").amount(new BigDecimal("210.00")).type("EXPENSE").category("Entertainment").date(today.minusDays(10)).merchant("Ticketmaster").paymentMethod("Apex Credit Card").isRecurring(false).notes("Summer Fest").build()
            ));
        }
    }
}
