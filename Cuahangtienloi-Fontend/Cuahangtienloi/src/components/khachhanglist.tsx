import React, { useState, useEffect } from "react";
import axios from "axios";

interface KhachHang {
  id: number;
  hoTen: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  userId: number;
}

const KhachHangList: React.FC = () => {
  const [khachHangs, setKhachHangs] = useState<KhachHang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [newKhachHang, setNewKhachHang] = useState<KhachHang>({
    id: 0,
    hoTen: "",
    soDienThoai: "",
    email: "",
    diaChi: "",
    userId: 0,
  });

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/khachhang/all")
      .then((res) => {
        setKhachHangs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu khách hàng.");
        setLoading(false);
        console.error("Lỗi API:", err);
      });
  }, []);

  const handleAddKhachHang = () => {
    const isDuplicateId = khachHangs.some((kh) => kh.id === newKhachHang.id);
    if (isDuplicateId) {
      alert("ID đã tồn tại. Vui lòng chọn ID khác.");
      return;
    }

    axios
      .post("http://localhost:8080/khachhang/add", newKhachHang)
      .then((res) => {
        setKhachHangs([...khachHangs, res.data]);
        resetForm();
        alert("Thêm khách hàng thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi thêm khách hàng.");
        console.error(err);
      });
  };

  const handleUpdateKhachHang = () => {
    axios
      .put(`http://localhost:8080/khachhang/update/${newKhachHang.id}`, newKhachHang)
      .then((res) => {
        const updated = khachHangs.map((kh) =>
          kh.id === newKhachHang.id ? res.data : kh
        );
        setKhachHangs(updated);
        resetForm();
        alert("Cập nhật khách hàng thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi cập nhật khách hàng.");
        console.error(err);
      });
  };

  const handleDeleteKhachHang = (id: number) => {
    axios
      .delete(`http://localhost:8080/khachhang/delete/${id}`)
      .then(() => {
        setKhachHangs(khachHangs.filter((kh) => kh.id !== id));
        alert("Xóa khách hàng thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi xóa khách hàng.");
        console.error(err);
      });
  };

  const resetForm = () => {
    setNewKhachHang({
      id: 0,
      hoTen: "",
      soDienThoai: "",
      email: "",
      diaChi: "",
      userId: 0,
    });
    setFormMode(null);
  };

  const isEditing = formMode === "edit";

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">DANH SÁCH KHÁCH HÀNG</h1>

      {formMode === null && (
        <button
          onClick={() => {
            setFormMode("add");
            setNewKhachHang({
              id: 0,
              hoTen: "",
              soDienThoai: "",
              email: "",
              diaChi: "",
              userId: 0,
            });
          }}
          className="mb-4 bg-green-600 text-white px-4 py-2"
        >
          + THÊM KHÁCH HÀNG
        </button>
      )}

      {formMode !== null && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-xl font-medium mb-2">
            {isEditing ? "Sửa khách hàng" : "Thêm khách hàng"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditing ? handleUpdateKhachHang() : handleAddKhachHang();
            }}
            className="grid grid-cols-2 gap-2"
          >
            {Object.entries(newKhachHang).map(([key, value]) => (
              <input
                key={key}
                type={typeof value === "number" ? "number" : "text"}
                placeholder={key}
                value={value || ""}
                onChange={(e) =>
                  setNewKhachHang({
                    ...newKhachHang,
                    [key]:
                      typeof value === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
                className="border p-2"
              />
            ))}
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-blue-600 text-white p-2">
                {isEditing ? "Cập nhật" : "Lưu"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white p-2"
              >
                HỦY
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Họ tên</th>
            <th className="px-4 py-2 border">Số điện thoại</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Địa chỉ</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {khachHangs.map((kh) => (
            <tr key={kh.id}>
              <td className="px-4 py-2 border">{kh.id}</td>
              <td className="px-4 py-2 border">{kh.hoTen}</td>
              <td className="px-4 py-2 border">{kh.soDienThoai}</td>
              <td className="px-4 py-2 border">{kh.email}</td>
              <td className="px-4 py-2 border">{kh.diaChi}</td>
              <td className="px-4 py-2 border">{kh.userId}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => {
                    setNewKhachHang(kh);
                    setFormMode("edit");
                  }}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  SỬA
                </button>
                <button
                  onClick={() => handleDeleteKhachHang(kh.id)}
                  className="bg-red-600 text-white p-1"
                >
                  XÓA
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KhachHangList;
