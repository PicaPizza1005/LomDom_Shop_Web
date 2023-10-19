package com.example.demo.services;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.models.CategoryDTO;
import com.example.demo.entities.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMap;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find category with id: " + id));
    }

    public Category get(final Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find category with id: " + id));
    }
    
    public Long create(CategoryDTO categoryDTO) {
        Category category = modelMap.map(categoryDTO, Category.class);
        categoryRepository.save(category);
        return category.getId();
    }

    public void update(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find category with id: " + id + " to update"));
        modelMap.map(categoryDTO, category);
        categoryRepository.save(category);
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

}
