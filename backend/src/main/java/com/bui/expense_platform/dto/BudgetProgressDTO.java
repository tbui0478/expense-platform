package com.bui.expense_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetProgressDTO {
    private Long budgetId;
    private String category;
    private BigDecimal monthlyLimit;
    private BigDecimal spentAmount;
    private BigDecimal remainingAmount;
    private double percentageUsed;
    private boolean isOverBudget;
    private BigDecimal overAmount;
    private String status; // ON_TRACK, WARNING, OVER_BUDGET
    private String icon;
    private String color;
}
