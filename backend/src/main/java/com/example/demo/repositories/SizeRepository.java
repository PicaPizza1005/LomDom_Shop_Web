package com.example.demo.repositories;
import com.example.demo.entities.Size;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
    Set<Size> findBySizeIdIn(Set<Long> sizeIds);
<<<<<<< HEAD
}
=======
}
>>>>>>> f2758242310d26216d067910597854aca43e165e
