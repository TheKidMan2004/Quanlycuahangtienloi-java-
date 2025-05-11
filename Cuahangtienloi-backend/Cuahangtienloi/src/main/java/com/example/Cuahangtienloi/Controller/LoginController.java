package com.example.Cuahangtienloi.Controller;

import com.example.Cuahangtienloi.Entity.UsersEntity;
import com.example.Cuahangtienloi.Repository.loginRepository;  // Import LoginRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {  // Đổi tên class thành LoginController

    @Autowired
    private loginRepository loginRepository;  // Inject LoginRepository

    // Đăng nhập và lấy vai trò của người dùng
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsersEntity user) {
        // Kiểm tra tên đăng nhập và mật khẩu
        if (user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Tên người dùng hoặc mật khẩu không được để trống.");
        }

        // Tìm người dùng theo username
        UsersEntity existingUser = loginRepository.findByUsername(user.getUsername()).orElse(null);

        if (existingUser != null && existingUser.getPassword().equals(user.getPassword()) && existingUser.getTrangThai()) {
            // Nếu tìm thấy người dùng và mật khẩu đúng, trả về role của họ
            return ResponseEntity.ok(new LoginResponse(existingUser.getRole()));
        }

        // Nếu không tìm thấy hoặc không đúng mật khẩu, trả về lỗi
        return ResponseEntity.status(401).body("Thông tin đăng nhập không đúng hoặc tài khoản đã bị khóa.");
    }

    public static class LoginResponse {
        private String role;

        public LoginResponse(String role) {
            this.role = role;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
