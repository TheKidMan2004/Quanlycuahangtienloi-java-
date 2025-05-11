package com.example.Cuahangtienloi.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hoadon")
public class HoaDonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "khach_hang_id")
    private Integer khachHangId;

    @Column(name = "nhan_vien_id")
    private Integer nhanVienId;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @Column(name = "tong_tien")
    private Double tongTien;

    // --- Getter và Setter ---

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getKhachHangId() {
        return khachHangId;
    }

    public void setKhachHangId(Integer khachHangId) {
        this.khachHangId = khachHangId;
    }

    public Integer getNhanVienId() {
        return nhanVienId;
    }

    public void setNhanVienId(Integer nhanVienId) {
        this.nhanVienId = nhanVienId;
    }

    public LocalDateTime getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(LocalDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    public Double getTongTien() {
        return tongTien;
    }

    public void setTongTien(Double tongTien) {
        this.tongTien = tongTien;
    }
}
