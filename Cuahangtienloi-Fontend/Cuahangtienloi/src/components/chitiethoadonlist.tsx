import React, { useEffect, useState } from "react";
import axios from "axios";

interface SanPham {
  id: number;
}

interface HoaDon {
  id: number;
}

interface ChiTietHoaDon {
  id?: number;
  hoaDon: HoaDon;
  sanPham: SanPham;
  soLuong: number;
  gia?: number;
  thanhTien?: number;
}

const ChiTietHoaDonList: React.FC = () => {
  const [list, setList] = useState<ChiTietHoaDon[]>([]);
  const [form, setForm] = useState<ChiTietHoaDon>({
    hoaDon: { id: 0 },
    sanPham: { id: 0 },
    soLuong: 1,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get("http://localhost:8080/chitiethoadon/all");
      setList(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "hoaDonId") {
      setForm({ ...form, hoaDon: { id: parseInt(value) } });
    } else if (name === "sanPhamId") {
      setForm({ ...form, sanPham: { id: parseInt(value) } });
    } else if (name === "soLuong") {
      setForm({ ...form, soLuong: parseInt(value) });
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && form.id) {
        await axios.put(`http://localhost:8080/chitiethoadon/${form.id}`, form);
      } else {
        await axios.post("http://localhost:8080/chitiethoadon/add", form);
      }
      fetchList();
      resetForm();
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err);
    }
  };

  const handleEdit = (ct: ChiTietHoaDon) => {
    setForm({
      id: ct.id,
      hoaDon: { id: ct.hoaDon.id },
      sanPham: { id: ct.sanPham.id },
      soLuong: ct.soLuong,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (window.confirm("Xác nhận xoá?")) {
      await axios.delete(`http://localhost:8080/chitiethoadon/${id}`);
      fetchList();
    }
  };

  const resetForm = () => {
    setForm({ hoaDon: { id: 0 }, sanPham: { id: 0 }, soLuong: 1 });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ fontWeight: "bold" }}>Chi Tiết Hóa Đơn</h2>

      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "500px",
        }}
      >
        <h4 style={{ fontWeight: "bold" }}>{isEditing ? "Sửa" : "Thêm"} chi tiết</h4>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div>
            <label>Hóa đơn ID:</label>
            <input
              type="number"
              name="hoaDonId"
              value={form.hoaDon.id}
              onChange={handleChange}
              style={{ width: "100px" }}
            />
          </div>
          <div>
            <label>Sản phẩm ID:</label>
            <input
              type="number"
              name="sanPhamId"
              value={form.sanPham.id}
              onChange={handleChange}
              style={{ width: "100px" }}
            />
          </div>
          <div>
            <label>Số lượng:</label>
            <input
              type="number"
              name="soLuong"
              value={form.soLuong}
              onChange={handleChange}
              style={{ width: "100px" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            {isEditing ? "Cập nhật" : "Thêm"}
          </button>
          <button
            onClick={resetForm}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f8f9fa",
              color: "#000",
              border: "1px solid #ccc",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Huỷ
          </button>
        </div>
      </div>

      <table
        border={1}
        cellPadding={5}
        cellSpacing={0}
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ backgroundColor: "#eee" }}>
          <tr>
            <th>ID</th>
            <th>Hóa đơn</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Thành tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {list.map((ct) => (
            <tr key={ct.id}>
              <td>{ct.id}</td>
              <td>{ct.hoaDon?.id}</td>
              <td>{ct.sanPham?.id}</td>
              <td>{ct.soLuong}</td>
              <td>{ct.gia?.toLocaleString("vi-VN")}</td>
              <td>{ct.thanhTien?.toLocaleString("vi-VN")}</td>
              <td>
                <button
                  onClick={() => handleEdit(ct)}
                  style={{
                    marginRight: "5px",
                    padding: "5px 10px",
                    backgroundColor: "#ffc107",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(ct.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChiTietHoaDonList;
