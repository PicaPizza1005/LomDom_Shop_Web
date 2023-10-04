package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.ERole;
import com.example.demo.entity.Role;
import com.example.demo.repos.RoleRepository;
@Service
public class RoleService {
    
    public Optional<Role> findByRoleName(ERole rolename) {
        return roleRepository.findByRolename(rolename);
    }

    @Autowired
    private RoleRepository roleRepository;

}
