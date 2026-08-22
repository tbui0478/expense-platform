package com.bui.expense_platform.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private BigDecimal cost;

    @Column(nullable = false)
    private String billingCycle; // MONTHLY, ANNUAL

    private LocalDate nextBillingDate;

    @Column(nullable = false)
    private String status; // ACTIVE, PAUSED, CANCELLED

    private String providerIcon;

    private Boolean isUnusedAlert;
}
