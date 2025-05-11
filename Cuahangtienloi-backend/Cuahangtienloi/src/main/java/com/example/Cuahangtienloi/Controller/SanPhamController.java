package com.example.Cuahangtienloi.Controller;

import com.example.Cuahangtienloi.Entity.SanPhamEntity;
import com.example.Cuahangtienloi.Repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/sanpham")

public class SanPhamController {
    @Autowired
    private SanPhamRepository sanPhamRepository;

    @GetMapping("/all")
    public Iterable<SanPhamEntity> getAllSanPham() {
        return sanPhamRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addSanPham(@RequestBody SanPhamEntity sanPham) {
        if (sanPham.getId() == null) {
            return ResponseEntity.badRequest().body("Vui lòng nhập ID sản phẩm!");
        }

        sanPhamRepository.save(sanPham);
        return ResponseEntity.ok("Sản phẩm đã được thêm thành công!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSanPham(@PathVariable Integer id) {
        if (!sanPhamRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm!");
        }

        sanPhamRepository.deleteById(id);
        return ResponseEntity.ok("Sản phẩm đã được xóa!");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateSanPham(@PathVariable Integer id, @RequestBody SanPhamEntity sanPham) {
        Optional<SanPhamEntity> optionalSanPham = sanPhamRepository.findById(id);
        if (optionalSanPham.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm!");
        }

        SanPhamEntity current = optionalSanPham.get();
        current.setTenSanPham(sanPham.getTenSanPham());
        current.setSoLuong(sanPham.getSoLuong());
        current.setGia(sanPham.getGia());
        current.setDonVi(sanPham.getDonVi());
        current.setLoai(sanPham.getLoai());
        current.setHinhAnh(sanPham.getHinhAnh());
        current.setNhaSanXuatId(sanPham.getNhaSanXuatId());

        sanPhamRepository.save(current);
        return ResponseEntity.ok("Cập nhật sản phẩm thành công!");
    }
}
