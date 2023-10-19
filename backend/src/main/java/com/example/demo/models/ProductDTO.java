package com.example.demo.models;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductDTO {
    
    private Long id;

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String description;

    private Long size_id;

    private Long color_id;

    @Size(max = 255)
    private String materials;

    @Size(max = 255)
    private String image;

    @Size(max = 255)
    private String instruction;
    
    private Long price;

    private Long category;
}
