package com.example.Cuahangtienloi.Controller;

import com.example.Cuahangtienloi.Entity.ChiTietHoaDonEntity;
import com.example.Cuahangtienloi.Entity.HoaDonEntity;
import com.example.Cuahangtienloi.Entity.SanPhamEntity;
import com.example.Cuahangtienloi.Repository.ChiTietHoaDonRepository;
import com.example.Cuahangtienloi.Repository.HoaDonRepository;
import com.example.Cuahangtienloi.Repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/chitiethoadon")
@CrossOrigin(origins = "http://localhost:5173")

public class ChiTietHoaDonController {
    @Autowired
    private ChiTietHoaDonRepository chiTietRepo;

    @Autowired
    private HoaDonRepository hoaDonRepo;

    @Autowired
    private SanPhamRepository sanPhamRepo;

    @GetMapping("/all")
    public Iterable<ChiTietHoaDonEntity> getAll() {
        return chiTietRepo.findAll();
    }

    @PostMapping("/add")
    public ChiTietHoaDonEntity add(@RequestBody ChiTietHoaDonEntity input) {
        Optional<HoaDonEntity> hoaDonOpt = hoaDonRepo.findById(input.getHoaDon().getId());
        Optional<SanPhamEntity> sanPhamOpt = sanPhamRepo.findById(input.getSanPham().getId());

        if (hoaDonOpt.isPresent() && sanPhamOpt.isPresent()) {
            SanPhamEntity sp = sanPhamOpt.get();
            HoaDonEntity hd = hoaDonOpt.get();

            input.setGia(sp.getGia());
            input.setThanhTien(sp.getGia() * input.getSoLuong());
            input.setHoaDon(hd);
            input.setSanPham(sp);

            ChiTietHoaDonEntity saved = chiTietRepo.save(input);

            capNhatTongTien(hd.getId());

            return saved;
        }
        return null;
    }

    @PutMapping("/{id}")
    public ChiTietHoaDonEntity update(@PathVariable Integer id, @RequestBody ChiTietHoaDonEntity input) {
        Optional<ChiTietHoaDonEntity> ctOpt = chiTietRepo.findById(id);
        if (ctOpt.isPresent()) {
            ChiTietHoaDonEntity ct = ctOpt.get();
            ct.setSoLuong(input.getSoLuong());

            Optional<SanPhamEntity> spOpt = sanPhamRepo.findById(input.getSanPham().getId());
            if (spOpt.isPresent()) {
                ct.setSanPham(spOpt.get());
                ct.setGia(spOpt.get().getGia());
                ct.setThanhTien(spOpt.get().getGia() * input.getSoLuong());
            }

            ChiTietHoaDonEntity updated = chiTietRepo.save(ct);
            capNhatTongTien(ct.getHoaDon().getId());
            return updated;
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        Optional<ChiTietHoaDonEntity> ctOpt = chiTietRepo.findById(id);
        if (ctOpt.isPresent()) {
            Integer hoaDonId = ctOpt.get().getHoaDon().getId();
            chiTietRepo.deleteById(id);
            capNhatTongTien(hoaDonId);
        }
    }

    private void capNhatTongTien(Integer hoaDonId) {
        Optional<HoaDonEntity> hdOpt = hoaDonRepo.findById(hoaDonId);
        if (hdOpt.isPresent()) {
            HoaDonEntity hoaDon = hdOpt.get();
            double tong = 0;
            for (ChiTietHoaDonEntity ct : chiTietRepo.findAll()) {
                if (ct.getHoaDon().getId().equals(hoaDonId)) {
                    tong += ct.getThanhTien();
                }
            }
            hoaDon.setTongTien(tong);
            hoaDonRepo.save(hoaDon);
        }
    }
}
