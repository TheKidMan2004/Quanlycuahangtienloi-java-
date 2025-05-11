package com.example.Cuahangtienloi.Controller;
import com.example.Cuahangtienloi.Entity.NhaSanXuatEntity;
import com.example.Cuahangtienloi.Repository.NhaSanXuatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/nhasanxuat")
public class NhaSanXuatController {
    @Autowired
    private NhaSanXuatRepository repository;

    @GetMapping("/all")
    public Iterable<NhaSanXuatEntity> getAll() {
        return repository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody NhaSanXuatEntity entity) {
        if (entity.getId() == null) {
            return ResponseEntity.badRequest().body("Vui lòng nhập ID!");
        }
        repository.save(entity);
        return ResponseEntity.ok("Đã thêm nhà sản xuất thành công!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.badRequest().body("Không tìm thấy nhà sản xuất!");
        }
        repository.deleteById(id);
        return ResponseEntity.ok("Xóa thành công!");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody NhaSanXuatEntity entity) {
        Optional<NhaSanXuatEntity> optional = repository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy nhà sản xuất!");
        }

        NhaSanXuatEntity current = optional.get();
        current.setTen(entity.getTen());
        current.setDiaChi(entity.getDiaChi());
        current.setSoDienThoai(entity.getSoDienThoai());

        repository.save(current);
        return ResponseEntity.ok("Cập nhật thành công!");
    }
}
