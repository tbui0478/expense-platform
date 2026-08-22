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
public class CategorySpendDTO {
    private String category;
    private BigDecimal amount;
    private double percentage;
    private String color;
}
