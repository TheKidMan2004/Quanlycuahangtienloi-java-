package com.example.Cuahangtienloi.Repository;

import com.example.Cuahangtienloi.Entity.HoaDonEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaDonRepository extends CrudRepository<HoaDonEntity, Integer> {
    // Tùy chọn: có thể thêm phương thức tìm kiếm nếu cần
}
