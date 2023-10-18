package com.example.demo.entities;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class Product {
    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "\"description\"")
    private String description;

    @Column(nullable = false)
    private Long size_id;

    @Column(nullable = false) 
    private Long color_id;

    @Column(nullable = false)
    private String materials;

    @Column
    private String image;

    @Column(nullable = false)
    private String instruction;
    
    @Column(nullable = false)
    private Long price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
