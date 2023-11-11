package com.example.demo.services;
import com.example.demo.repositories.SizeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SizeService {
    @Autowired
    private SizeRepository sizeRepository;
}
