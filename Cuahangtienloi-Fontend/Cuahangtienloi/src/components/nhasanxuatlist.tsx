import React, { useEffect, useState } from "react";
import axios from "axios";

interface NhaSanXuat {
  id: number;
  ten: string;
  diaChi: string;
  soDienThoai: string;
}

const NhaSanXuatList: React.FC = () => {
  const [nhaSanXuat, setNhaSanXuat] = useState<NhaSanXuat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [newNhaSanXuat, setNewNhaSanXuat] = useState<NhaSanXuat>({
    id: 0,
    ten: "",
    diaChi: "",
    soDienThoai: "",
  });

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/nhasanxuat/all")
      .then((response) => {
        setNhaSanXuat(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu.");
        setLoading(false);
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  const handleAddNhaSanXuat = () => {
    const isDuplicateId = nhaSanXuat.some((nsx) => nsx.id === newNhaSanXuat.id);
    if (isDuplicateId) {
      alert("ID đã tồn tại. Vui lòng nhập ID khác.");
      return;
    }

    axios
      .post("http://localhost:8080/nhasanxuat/add", newNhaSanXuat)
      .then(() => {
        setNhaSanXuat([...nhaSanXuat, newNhaSanXuat]);
        resetForm();
        alert("Thêm nhà sản xuất thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi thêm nhà sản xuất.");
        console.error("Lỗi khi thêm nhà sản xuất:", err);
      });
  };

  const handleUpdateNhaSanXuat = () => {
    axios
      .put(`http://localhost:8080/nhasanxuat/update/${newNhaSanXuat.id}`, newNhaSanXuat)
      .then(() => {
        const updated = nhaSanXuat.map((item) =>
          item.id === newNhaSanXuat.id ? newNhaSanXuat : item
        );
        setNhaSanXuat(updated);
        resetForm();
        alert("Cập nhật nhà sản xuất thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi cập nhật nhà sản xuất.");
        console.error("Lỗi khi cập nhật nhà sản xuất:", err);
      });
  };

  const handleDeleteNhaSanXuat = (id: number) => {
    axios
      .delete(`http://localhost:8080/nhasanxuat/delete/${id}`)
      .then(() => {
        setNhaSanXuat(nhaSanXuat.filter((nsx) => nsx.id !== id));
        alert("Xóa nhà sản xuất thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi xóa nhà sản xuất.");
        console.error("Lỗi khi xóa nhà sản xuất:", err);
      });
  };

  const resetForm = () => {
    setNewNhaSanXuat({
      id: 0,
      ten: "",
      diaChi: "",
      soDienThoai: "",
    });
    setFormMode(null);
  };

  const isEditing = formMode === "edit";

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">DANH SÁCH NHÀ SẢN XUẤT</h1>

      {formMode === null && (
        <button
          onClick={() => {
            setFormMode("add");
            setNewNhaSanXuat({
              id: 0,
              ten: "",
              diaChi: "",
              soDienThoai: "",
            });
          }}
          className="mb-4 bg-green-600 text-white px-4 py-2"
        >
          + THÊM NHÀ SẢN XUẤT
        </button>
      )}

      {formMode !== null && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-xl font-medium mb-2">
            {isEditing ? "Sửa nhà sản xuất" : "Thêm nhà sản xuất"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditing ? handleUpdateNhaSanXuat() : handleAddNhaSanXuat();
            }}
            className="grid grid-cols-2 gap-2"
          >
            {Object.entries(newNhaSanXuat).map(([key, value]) => (
              <input
                key={key}
                type={key === "soDienThoai" ? "text" : "text"}
                placeholder={key}
                value={value || ""}
                onChange={(e) =>
                  setNewNhaSanXuat({
                    ...newNhaSanXuat,
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
            <th className="px-4 py-2 border">Tên</th>
            <th className="px-4 py-2 border">Địa chỉ</th>
            <th className="px-4 py-2 border">Số điện thoại</th>
            <th className="px-4 py-2 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {nhaSanXuat.map((nsx) => (
            <tr key={nsx.id}>
              <td className="px-4 py-2 border">{nsx.id}</td>
              <td className="px-4 py-2 border">{nsx.ten}</td>
              <td className="px-4 py-2 border">{nsx.diaChi}</td>
              <td className="px-4 py-2 border">{nsx.soDienThoai}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => {
                    setNewNhaSanXuat(nsx);
                    setFormMode("edit");
                  }}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  SỬA
                </button>
                <button
                  onClick={() => handleDeleteNhaSanXuat(nsx.id)}
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

export default NhaSanXuatList;
