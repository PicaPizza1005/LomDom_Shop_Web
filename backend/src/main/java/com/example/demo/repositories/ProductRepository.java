package com.example.demo.repositories;
import com.example.demo.entities.Product;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Query;
=======
import org.springframework.stereotype.Repository;

@Repository
>>>>>>> f2758242310d26216d067910597854aca43e165e
public interface ProductRepository extends JpaRepository<Product, Long>{
    List<Product> findAllByCategoryId(Long categoryId);
    @Query("SELECT p FROM Product p WHERE p.name LIKE CONCAT('%', :query, '%')")
    List<Product> searchProducts(String query);
}
