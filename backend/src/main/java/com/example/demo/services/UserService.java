package com.example.demo.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;


@Service
@Transactional
public class UserService{
     @Autowired
    private UserRepository userRepository;
    public boolean existsByEmail(String email) {
       return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public User saveOrUpdate(User user) {
        return userRepository.save(user);
    }
}
