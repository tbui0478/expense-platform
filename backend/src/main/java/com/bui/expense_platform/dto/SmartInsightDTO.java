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
public class SmartInsightDTO {
    private String id;
    private String title;
    private String description;
    private String type; // WARNING, TIP, SUCCESS, SAVINGS
    private BigDecimal potentialSavingsMonth;
    private String actionLabel;
}
