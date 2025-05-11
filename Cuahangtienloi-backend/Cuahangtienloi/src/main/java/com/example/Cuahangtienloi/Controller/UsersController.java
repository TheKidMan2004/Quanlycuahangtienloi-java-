package com.example.Cuahangtienloi.Controller;
import com.example.Cuahangtienloi.Entity.UsersEntity;
import com.example.Cuahangtienloi.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {
    @Autowired
    private UsersRepository usersRepository;

    // Trả về danh sách tất cả người dùng
    @GetMapping("/all")
    public Iterable<UsersEntity> getAllUsers() {
        return usersRepository.findAll();
    }

    // Thêm người dùng mới, yêu cầu id từ phía client
    @PostMapping("/add")
    public ResponseEntity<String> addNewUser(@RequestBody UsersEntity user) {
        // Kiểm tra nếu id đã được cung cấp (trong trường hợp này bạn cần cung cấp id)
        if (user.getId() == null) {
            return ResponseEntity.badRequest().body("Vui lòng cung cấp id cho Users!");
        }
        usersRepository.save(user);
        return ResponseEntity.ok("Users đã được thêm thành công!");
    }

    // Xóa người dùng theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        if (!usersRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Không tìm thấy User!");
        }
        usersRepository.deleteById(id);
        return ResponseEntity.ok("Users đã được xóa thành công!");
    }

    // Cập nhật thông tin người dùng
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Integer id, @RequestBody UsersEntity user) {
        Optional<UsersEntity> optionalUser = usersRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy Users!");
        }
        UsersEntity currentUser = optionalUser.get();
        currentUser.setUsername(user.getUsername());
        currentUser.setPassword(user.getPassword());
        currentUser.setRole(user.getRole());
        currentUser.setTrangThai(user.getTrangThai());

        usersRepository.save(currentUser);
        return ResponseEntity.ok("Users đã được cập nhật thành công!");
    }
}
