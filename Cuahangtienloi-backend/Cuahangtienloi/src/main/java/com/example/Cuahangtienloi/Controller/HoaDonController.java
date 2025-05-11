package com.example.Cuahangtienloi.Controller;

import com.example.Cuahangtienloi.Entity.HoaDonEntity;
import com.example.Cuahangtienloi.Repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hoadon")
@CrossOrigin(origins = "http://localhost:5173")
public class HoaDonController {
    @Autowired
    private HoaDonRepository hoaDonRepository;

    // Lấy tất cả hóa đơn
    @GetMapping("/all")
    public ResponseEntity<List<HoaDonEntity>> getAllHoaDon() {
        List<HoaDonEntity> list = new ArrayList<>();
        hoaDonRepository.findAll().forEach(list::add);
        return ResponseEntity.ok(list);
    }

    // Thêm hóa đơn
    @PostMapping("/add")
    public ResponseEntity<HoaDonEntity> addHoaDon(@RequestBody HoaDonEntity hoaDonEntity) {
        hoaDonEntity.setNgayTao(LocalDateTime.now());
        hoaDonEntity.setTongTien(0.0);
        HoaDonEntity saved = hoaDonRepository.save(hoaDonEntity);
        return ResponseEntity.status(201).body(saved);
    }

    // Sửa hóa đơn
    @PutMapping("/update/{id}")
    public ResponseEntity<HoaDonEntity> updateHoaDon(@PathVariable Integer id, @RequestBody HoaDonEntity hoaDonEntity) {
        Optional<HoaDonEntity> optional = hoaDonRepository.findById(id);
        if (optional.isPresent()) {
            hoaDonEntity.setId(id);
            HoaDonEntity updated = hoaDonRepository.save(hoaDonEntity);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    // Xóa hóa đơn
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHoaDon(@PathVariable Integer id) {
        if (hoaDonRepository.existsById(id)) {
            hoaDonRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
