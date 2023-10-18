// package com.example.demo.services;
// import com.example.demo.entities.Product;
// import com.example.demo.repositories.CartItemRepository;
// import com.example.demo.repositories.UserRepository;
// import com.example.demo.repositories.ProductRepository;
// import com.example.demo.security.AuthService;
// import com.example.demo.entities.CartItem;
// import com.example.demo.entities.User;
// import com.example.demo.models.CartItemDTO;

// import org.modelmapper.ModelMapper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;
// import org.springframework.web.bind.annotation.PathVariable;
// import java.util.List;

// @Service
// public class CartItemService {
//     private final CartItemRepository cartItemRepository;
//     private final UserRepository userRepository;
//     private final ProductRepository productRepository;
    
//     @Autowired
//     private ModelMapper modelMap;

//     @Autowired
//     private AuthService authService;

//     @Autowired
//     private ProductService productService;

//     public CartItemService(final CartItemRepository cartItemRepository, final UserRepository userRepository, final ProductRepository productRepository) {
//         this.cartItemRepository = cartItemRepository;
//         this.userRepository = userRepository;
//         this.productRepository = productRepository;
//     }

//     public List<CartItem> findAllByUserId() {
//         return cartItemRepository.findAllByUserId(authService.getCurrentUserId());
//     }

//     public void deleteAllByUserId() {
//         cartItemRepository.deleteAllByUserId(authService.getCurrentUserId());
//     }

//     public CartItem get(final Long id) {
//         return cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find cartItem with id: " + id));
//     }

//     @Transactional
//     public CartItem create(CartItemDTO cartItemDTO) {
//         CartItem cartItem = cartItemRepository.findByUserIdAndProductId(authService.getCurrentUserId(), cartItemDTO.getProductId());
//         if (cartItem == null) {
//             cartItem = new CartItem();
//             cartItem.setQuantity(cartItemDTO.getQuantity());
//             cartItem.setUser(authService.getCurrentUser());
//             cartItem.setProduct(productService.get(cartItemDTO.getProductId()));
//         } else {
//             cartItem.setQuantity(cartItem.getQuantity() + 1);
//         }
//     }

//     public CartItem update(Long id, CartItemDTO cartItemDTO) {
//         CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find cartItem with id: " + id + " to update"));
//         modelMap.map(cartItemDTO, cartItem);
//         cartItemRepository.save(cartItem);
//         return cartItem;
//     }

//     public void delete(Long id) {
//         cartItemRepository.deleteById(id);
//     }
// }