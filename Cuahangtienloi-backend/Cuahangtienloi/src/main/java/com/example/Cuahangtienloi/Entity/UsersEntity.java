package com.example.Cuahangtienloi.Entity;
import  jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UsersEntity {
    @Id
    private Integer id;

    private String username;
    private String password;
    private String role;

    @Column(name = "trang_thai")
    private Boolean trangThai;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Boolean trangThai) {
        this.trangThai = trangThai;
    }
}
