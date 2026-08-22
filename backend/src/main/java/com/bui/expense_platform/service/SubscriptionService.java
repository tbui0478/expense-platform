package com.bui.expense_platform.service;

import com.bui.expense_platform.model.Subscription;
import com.bui.expense_platform.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public Subscription addSubscription(Subscription subscription) {
        if (subscription.getStatus() == null) {
            subscription.setStatus("ACTIVE");
        }
        return subscriptionRepository.save(subscription);
    }

    public Subscription toggleSubscriptionStatus(Long id) {
        Subscription sub = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found with id " + id));
        if ("ACTIVE".equalsIgnoreCase(sub.getStatus())) {
            sub.setStatus("PAUSED");
        } else {
            sub.setStatus("ACTIVE");
        }
        return subscriptionRepository.save(sub);
    }

    public void deleteSubscription(Long id) {
        subscriptionRepository.deleteById(id);
    }
}
