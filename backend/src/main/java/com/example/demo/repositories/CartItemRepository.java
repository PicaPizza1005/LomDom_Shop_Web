package com.example.demo.repositories;
import com.example.demo.entities.CartItem;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    void deleteAllByUserId(Long userId);
    List<CartItem> findAllByUserId(Long userId);
    CartItem findByUserIdAndProductId(Long userId, Long productId);
}
