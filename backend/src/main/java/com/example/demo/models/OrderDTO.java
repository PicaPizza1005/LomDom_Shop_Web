package com.example.demo.models;

import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderDTO {

    private Long id;

    private Long total;

    @Size(max = 255)
    private String address;

    private Long status;

    private Long user;
<<<<<<< HEAD
}
=======
}
>>>>>>> f2758242310d26216d067910597854aca43e165e
