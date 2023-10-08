package com.example.demo.services;
import com.example.demo.repositories.CartItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;



}
