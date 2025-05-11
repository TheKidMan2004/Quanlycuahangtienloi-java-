import { useEffect, useState } from "react";
import axios from "axios";

interface SanPham {
  id: number;
  tenSanPham: string;
  gia: number;
  hinhAnh: string;
}

const AdminHome = () => {
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/sanpham/all")
      .then((res) => setSanPhams(res.data))
      .catch((err) => console.error("Lỗi tải dữ liệu sản phẩm:", err));
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url("/images/layout/cuahang.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "40px",
        color: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Xin chào, đã đến trang Quản Lý Cửa Hàng Tiện Lợi!
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {sanPhams.map((sp) => (
          <div
            key={sp.id}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "10px",
              padding: "20px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={sp.hinhAnh ? `/images/${sp.hinhAnh}` : "/images/default.jpg"}
              alt={sp.tenSanPham}
              onError={(e) =>
                (e.currentTarget.src = "/images/default.jpg")
              }
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{sp.tenSanPham}</h3>
            <p style={{ margin: 0 }}>
              Giá: {sp.gia?.toLocaleString("vi-VN")} VNĐ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
