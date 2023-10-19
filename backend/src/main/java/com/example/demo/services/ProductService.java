package com.example.demo.services;

import com.example.demo.entities.Product;
import com.example.demo.entities.Category;
//import com.example.demo.entities.OrderItem;
import com.example.demo.models.ProductDTO;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.OrderItemRepository;
import com.example.demo.repositories.ProductRepository;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    public ProductService(final ProductRepository productRepository,
            final OrderItemRepository orderItemRepository,
            final CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.categoryRepository = categoryRepository;
    }
    
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product get(final Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final ProductDTO productDTO) {
        final Product product = new Product();
        mapToEntity(productDTO, product);
        return productRepository.save(product).getId();
    }

    public void update(final Long id, final ProductDTO productDTO) {
        final Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(productDTO, product);
        productRepository.save(product);
    }

    public void delete(final Long id) {
        productRepository.deleteById(id);
    }


    private Product mapToEntity(final ProductDTO productDTO, Product product) {
        product = modelMapper.map(productDTO, Product.class);
        if (productDTO.getCategory() != null && (product.getCategory() == null || !product.getCategory().getId().equals(productDTO.getCategory()))) {
            final Category category = categoryRepository.findById(productDTO.getCategory())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "category not found"));
            product.setCategory(category);
        }
        return product;
    }

}
