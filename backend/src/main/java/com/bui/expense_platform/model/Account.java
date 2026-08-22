package com.bui.expense_platform.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String accountType; // CHECKING, SAVINGS, CREDIT_CARD, INVESTMENT

    @Column(nullable = false)
    private BigDecimal balance;

    private String currency; // USD, EUR, GBP, JPY
    
    private String accountNumberLast4;
}
