import React, { useEffect, useState } from "react";
import axios from "axios";

interface NhanVien {
  id: number;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  userId: number;
}

const NhanVienList: React.FC = () => {
  const [nhanVienList, setNhanVienList] = useState<NhanVien[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [newNhanVien, setNewNhanVien] = useState<NhanVien>({
    id: 0,
    hoTen: "",
    ngaySinh: "",
    gioiTinh: "",
    soDienThoai: "",
    email: "",
    diaChi: "",
    userId: 0,
  });

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/nhanvien/all")
      .then((response) => {
        setNhanVienList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu.");
        setLoading(false);
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  const handleAddNhanVien = () => {
    axios
      .post("http://localhost:8080/nhanvien/add", newNhanVien)
      .then(() => {
        setNhanVienList([...nhanVienList, newNhanVien]);
        resetForm();
        alert("Thêm nhân viên thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi thêm nhân viên.");
        console.error("Lỗi khi thêm nhân viên:", err);
      });
  };

  const handleUpdateNhanVien = () => {
    axios
      .put(`http://localhost:8080/nhanvien/update/${newNhanVien.id}`, newNhanVien)
      .then(() => {
        const updated = nhanVienList.map((item) =>
          item.id === newNhanVien.id ? newNhanVien : item
        );
        setNhanVienList(updated);
        resetForm();
        alert("Cập nhật nhân viên thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi cập nhật nhân viên.");
        console.error("Lỗi khi cập nhật nhân viên:", err);
      });
  };

  const handleDeleteNhanVien = (id: number) => {
    axios
      .delete(`http://localhost:8080/nhanvien/delete/${id}`)
      .then(() => {
        setNhanVienList(nhanVienList.filter((nv) => nv.id !== id));
        alert("Xóa nhân viên thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi xóa nhân viên.");
        console.error("Lỗi khi xóa nhân viên:", err);
      });
  };

  const resetForm = () => {
    setNewNhanVien({
      id: 0,
      hoTen: "",
      ngaySinh: "",
      gioiTinh: "",
      soDienThoai: "",
      email: "",
      diaChi: "",
      userId: 0,
    });
    setFormMode(null);
  };

  const isEditing = formMode === "edit";

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">DANH SÁCH NHÂN VIÊN</h1>

      {formMode === null && (
        <button
          onClick={() => {
            setFormMode("add");
            setNewNhanVien({
              id: 0,
              hoTen: "",
              ngaySinh: "",
              gioiTinh: "",
              soDienThoai: "",
              email: "",
              diaChi: "",
              userId: 0,
            });
          }}
          className="mb-4 bg-green-600 text-white px-4 py-2"
        >
          + THÊM NHÂN VIÊN
        </button>
      )}

      {formMode !== null && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-xl font-medium mb-2">
            {isEditing ? "Sửa nhân viên" : "Thêm nhân viên"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditing ? handleUpdateNhanVien() : handleAddNhanVien();
            }}
            className="grid grid-cols-2 gap-2"
          >
            {Object.entries(newNhanVien).map(([key, value]) => (
              <input
                key={key}
                type={key === "soDienThoai" || key === "email" ? "text" : "text"}
                placeholder={key}
                value={value || ""}
                onChange={(e) =>
                  setNewNhanVien({
                    ...newNhanVien,
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
            <th className="px-4 py-2 border">Ngày sinh</th>
            <th className="px-4 py-2 border">Giới tính</th>
            <th className="px-4 py-2 border">Số điện thoại</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Địa chỉ</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {nhanVienList.map((nv) => (
            <tr key={nv.id}>
              <td className="px-4 py-2 border">{nv.id}</td>
              <td className="px-4 py-2 border">{nv.hoTen}</td>
              <td className="px-4 py-2 border">{nv.ngaySinh}</td>
              <td className="px-4 py-2 border">{nv.gioiTinh}</td>
              <td className="px-4 py-2 border">{nv.soDienThoai}</td>
              <td className="px-4 py-2 border">{nv.email}</td>
              <td className="px-4 py-2 border">{nv.diaChi}</td>
              <td className="px-4 py-2 border">{nv.userId}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => {
                    setNewNhanVien(nv);
                    setFormMode("edit");
                  }}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  SỬA
                </button>
                <button
                  onClick={() => handleDeleteNhanVien(nv.id)}
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

export default NhanVienList;
