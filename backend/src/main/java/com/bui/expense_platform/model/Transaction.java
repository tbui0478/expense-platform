package com.bui.expense_platform.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String type; // EXPENSE, INCOME

    @Column(nullable = false)
    private String category; // Food & Dining, Housing, Utilities, Subscriptions, Entertainment, Transport, Shopping, Income

    private LocalDate date;

    private String merchant;

    private String paymentMethod;

    private Boolean isRecurring;

    private String notes;
}
