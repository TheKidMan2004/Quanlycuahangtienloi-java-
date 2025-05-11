package com.example.Cuahangtienloi.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "sanpham")

public class SanPhamEntity {
    @Id
    private Integer id; // ID nhập thủ công

    @Column(name = "ten_san_pham", nullable = false)
    private String tenSanPham;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "gia")
    private Double gia;

    @Column(name = "don_vi")
    private String donVi;

    @Column(name = "loai")
    private String loai;

    @Column(name = "hinh_anh")
    private String hinhAnh;

    @Column(name = "nhasanxuat_id")
    private Integer nhaSanXuatId;

    // Getters và Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
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

    public String getDonVi() {
        return donVi;
    }

    public void setDonVi(String donVi) {
        this.donVi = donVi;
    }

    public String getLoai() {
        return loai;
    }

    public void setLoai(String loai) {
        this.loai = loai;
    }

    public String getHinhAnh() {
        return hinhAnh;
    }

    public void setHinhAnh(String hinhAnh) {
        this.hinhAnh = hinhAnh;
    }

    public Integer getNhaSanXuatId() {
        return nhaSanXuatId;
    }

    public void setNhaSanXuatId(Integer nhaSanXuatId) {
        this.nhaSanXuatId = nhaSanXuatId;
    }
}
