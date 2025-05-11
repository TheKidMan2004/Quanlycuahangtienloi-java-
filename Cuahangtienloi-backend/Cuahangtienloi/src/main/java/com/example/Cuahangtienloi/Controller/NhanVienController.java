package com.example.Cuahangtienloi.Controller;

import com.example.Cuahangtienloi.Entity.NhanVienEntity;
import com.example.Cuahangtienloi.Repository.NhanVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/nhanvien")
@CrossOrigin(origins = "http://localhost:5173")
public class NhanVienController {
    @Autowired
    private NhanVienRepository nhanVienRepository;

    @GetMapping("/all")
    public Iterable<NhanVienEntity> getAllNhanVien() {
        return nhanVienRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNhanVien(@RequestBody NhanVienEntity nhanVien) {
        if (nhanVien.getId() == null) {
            return ResponseEntity.badRequest().body("Vui lòng nhập ID cho nhân viên!");
        }
        nhanVienRepository.save(nhanVien);
        return ResponseEntity.ok("Đã thêm nhân viên thành công!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNhanVien(@PathVariable Integer id) {
        if (!nhanVienRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Không tìm thấy nhân viên!");
        }
        nhanVienRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa nhân viên thành công!");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateNhanVien(@PathVariable Integer id, @RequestBody NhanVienEntity nhanVien) {
        Optional<NhanVienEntity> optionalNV = nhanVienRepository.findById(id);
        if (optionalNV.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy nhân viên!");
        }
        NhanVienEntity currentNV = optionalNV.get();
        currentNV.setHoTen(nhanVien.getHoTen());
        currentNV.setNgaySinh(nhanVien.getNgaySinh());
        currentNV.setGioiTinh(nhanVien.getGioiTinh());
        currentNV.setSoDienThoai(nhanVien.getSoDienThoai());
        currentNV.setEmail(nhanVien.getEmail());
        currentNV.setDiaChi(nhanVien.getDiaChi());
        currentNV.setUserId(nhanVien.getUserId());

        nhanVienRepository.save(currentNV);
        return ResponseEntity.ok("Đã cập nhật nhân viên thành công!");
    }
}
