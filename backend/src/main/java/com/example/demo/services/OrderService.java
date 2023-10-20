package com.example.demo.services;

import com.example.demo.repositories.OrderItemRepository;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.OrderStatusRepository;
import com.example.demo.services.UserService;
import com.example.demo.entities.Order;
import com.example.demo.models.OrderDTO;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class OrderService {
    private OrderRepository orderRepository;
    private OrderStatusRepository orderStatusRepository;
    private UserService userService;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ModelMapper modelMap;

    public OrderService(OrderRepository orderRepository, OrderStatusRepository orderStatusRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.userService = userService;
    }

    public List<Order> findAllByUsersId(Long userId) {
        return orderRepository.findAllByUserId(userId);
    }
    

    public Order get(final Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find order with id: " + id));
    }

    public Long create(final OrderDTO orderDTO) {
        Order order = modelMap.map(orderDTO, Order.class);
        return orderRepository.save(order).getId();
    }

    public void update(final Long id, final OrderDTO orderDTO) {
        final Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find order with id: " + id + " to update"));
        modelMap.map(orderDTO, order);
        orderRepository.save(order);
    }

    public void delete(final Long id) {
        orderRepository.deleteById(id);
    }

    
}
    