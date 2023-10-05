package com.example.demo.services;
import com.example.demo.entities.Product;
import com.example.demo.repositories.CartItemRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.repositories.ProductRepository; 

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class CartItemService {
    private CartItemRepository cartItemRepository;
    private UserRepository userRepository;
    private ProductRepository productRepository;
    
    @Autowired
    private ModelMapper modelMap;

    public CartItemService(CartItemRepository cartItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

}