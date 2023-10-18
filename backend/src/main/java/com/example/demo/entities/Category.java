package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Category {
    @Id
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String name_category;

    @ManyToOne
    @JoinColumn(name = "parent_category")
    private Category parentCategory;
}
