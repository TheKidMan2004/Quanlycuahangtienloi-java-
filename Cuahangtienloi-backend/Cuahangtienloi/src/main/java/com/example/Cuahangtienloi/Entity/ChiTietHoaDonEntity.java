package com.example.Cuahangtienloi.Entity;
import jakarta.persistence.*;
@Entity
@Table(name = "chitiethoadon")
public class ChiTietHoaDonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "hoadon_id")
    private HoaDonEntity hoaDon;

    @ManyToOne
    @JoinColumn(name = "sanpham_id")
    private SanPhamEntity sanPham;

    private Integer soLuong;

    private Double gia;

    private Double thanhTien;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public HoaDonEntity getHoaDon() {
        return hoaDon;
    }

    public void setHoaDon(HoaDonEntity hoaDon) {
        this.hoaDon = hoaDon;
    }

    public SanPhamEntity getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPhamEntity sanPham) {
        this.sanPham = sanPham;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Double getGia() {
        return gia;
    }

    public void setGia(Double gia) {
        this.gia = gia;
    }

    public Double getThanhTien() {
        return thanhTien;
    }

    public void setThanhTien(Double thanhTien) {
        this.thanhTien = thanhTien;
    }
}
