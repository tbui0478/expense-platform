package com.bui.expense_platform.controller;

import com.bui.expense_platform.model.Budget;
import com.bui.expense_platform.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping
    public ResponseEntity<List<Budget>> getAllBudgets() {
        return ResponseEntity.ok(budgetService.getAllBudgets());
    }

    @PostMapping
    public ResponseEntity<Budget> saveBudget(@RequestBody Budget budget) {
        return ResponseEntity.ok(budgetService.saveBudget(budget));
    }

    @PutMapping("/{id}/limit")
    public ResponseEntity<Budget> updateLimit(@PathVariable Long id, @RequestParam BigDecimal limit) {
        return ResponseEntity.ok(budgetService.updateBudgetLimit(id, limit));
    }
}
