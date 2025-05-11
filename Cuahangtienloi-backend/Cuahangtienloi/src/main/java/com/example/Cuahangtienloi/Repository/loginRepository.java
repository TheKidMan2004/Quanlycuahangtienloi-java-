package com.example.Cuahangtienloi.Repository;
import com.example.Cuahangtienloi.Entity.UsersEntity;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;
public interface loginRepository extends CrudRepository<UsersEntity, Integer> {
    Optional<UsersEntity> findByUsername(String username);
}
