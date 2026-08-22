package com.bui.expense_platform.service;

import com.bui.expense_platform.model.Budget;
import com.bui.expense_platform.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    public Budget saveBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public Budget updateBudgetLimit(Long id, BigDecimal newLimit) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found with id " + id));
        budget.setMonthlyLimit(newLimit);
        return budgetRepository.save(budget);
    }
}
