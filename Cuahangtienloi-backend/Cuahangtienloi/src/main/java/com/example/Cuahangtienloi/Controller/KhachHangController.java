package com.example.Cuahangtienloi.Controller;

import com.example.Cuahangtienloi.Entity.KhachHangEntity;
import com.example.Cuahangtienloi.Repository.KhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/khachhang")
@CrossOrigin(origins = "http://localhost:5173")
public class KhachHangController {
    @Autowired
    private KhachHangRepository khachHangRepository;

    // Trả về danh sách tất cả khách hàng
    @GetMapping("/all")
    public Iterable<KhachHangEntity> getAllKhachHang() {
        return khachHangRepository.findAll();
    }

    // Thêm khách hàng mới (yêu cầu ID từ client)
    @PostMapping("/add")
    public ResponseEntity<String> addNewKhachHang(@RequestBody KhachHangEntity khachHang) {
        if (khachHang.getId() == null) {
            return ResponseEntity.badRequest().body("Vui lòng cung cấp ID cho Khách hàng!");
        }
        khachHangRepository.save(khachHang);
        return ResponseEntity.ok("Khách hàng đã được thêm thành công!");
    }

    // Xóa khách hàng theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteKhachHang(@PathVariable Integer id) {
        if (!khachHangRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Không tìm thấy khách hàng!");
        }
        khachHangRepository.deleteById(id);
        return ResponseEntity.ok("Khách hàng đã được xóa thành công!");
    }

    // Cập nhật thông tin khách hàng
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateKhachHang(@PathVariable Integer id, @RequestBody KhachHangEntity khachHang) {
        Optional<KhachHangEntity> optionalKhach = khachHangRepository.findById(id);
        if (optionalKhach.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy khách hàng!");
        }
        KhachHangEntity current = optionalKhach.get();
        current.setHoTen(khachHang.getHoTen());
        current.setSoDienThoai(khachHang.getSoDienThoai());
        current.setEmail(khachHang.getEmail());
        current.setDiaChi(khachHang.getDiaChi());
        current.setUserId(khachHang.getUserId());

        khachHangRepository.save(current);
        return ResponseEntity.ok("Khách hàng đã được cập nhật thành công!");
    }
}
