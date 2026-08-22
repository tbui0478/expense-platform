package com.bui.expense_platform.repository;

import com.bui.expense_platform.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);

    List<Transaction> findTop10ByOrderByDateDescIdDesc();

    @Query("SELECT t FROM Transaction t WHERE t.type = :type AND t.date >= :startDate")
    List<Transaction> findByTypeAndDateAfter(@Param("type") String type, @Param("startDate") LocalDate startDate);
}
