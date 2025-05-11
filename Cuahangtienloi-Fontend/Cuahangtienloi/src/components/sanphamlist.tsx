import React, { useEffect, useState } from "react";
import axios from "axios";

interface SanPham {
  id: number;
  tenSanPham: string;
  soLuong: number;
  gia: number;
  donVi: string;
  loai: string;
  hinhAnh: string;
  nhaSanXuatId: number;
}

const SanPhamList: React.FC = () => {
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [newSanPham, setNewSanPham] = useState<SanPham>({
    id: 0,
    tenSanPham: "",
    soLuong: 0,
    gia: 0,
    donVi: "",
    loai: "",
    hinhAnh: "",
    nhaSanXuatId: 0,
  });

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/sanpham/all")
      .then((response) => {
        setSanPhams(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu.");
        setLoading(false);
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  const handleAddSanPham = () => {
    const isDuplicateId = sanPhams.some((sp) => sp.id === newSanPham.id);
    if (isDuplicateId) {
      alert("ID đã tồn tại. Vui lòng nhập ID khác.");
      return;
    }

    axios
      .post("http://localhost:8080/sanpham/add", newSanPham)
      .then((response) => {
        setSanPhams([...sanPhams, response.data]);
        resetForm();
        alert("Thêm sản phẩm thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi thêm sản phẩm.");
        console.error("Lỗi khi thêm sản phẩm:", err);
      });
  };

  const handleUpdateSanPham = () => {
    axios
      .put(`http://localhost:8080/sanpham/update/${newSanPham.id}`, newSanPham)
      .then((response) => {
        const updated = sanPhams.map((item) =>
          item.id === newSanPham.id ? response.data : item
        );
        setSanPhams(updated);
        resetForm();
        alert("Cập nhật sản phẩm thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi cập nhật sản phẩm.");
        console.error("Lỗi khi cập nhật sản phẩm:", err);
      });
  };

  const handleDeleteSanPham = (id: number) => {
    axios
      .delete(`http://localhost:8080/sanpham/delete/${id}`)
      .then(() => {
        setSanPhams(sanPhams.filter((sp) => sp.id !== id));
        alert("Xóa sản phẩm thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi xóa sản phẩm.");
        console.error("Lỗi khi xóa sản phẩm:", err);
      });
  };

  const resetForm = () => {
    setNewSanPham({
      id: 0,
      tenSanPham: "",
      soLuong: 0,
      gia: 0,
      donVi: "",
      loai: "",
      hinhAnh: "",
      nhaSanXuatId: 0,
    });
    setFormMode(null);
  };

  const isEditing = formMode === "edit";

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">DANH SÁCH SẢN PHẨM</h1>

      {formMode === null && (
        <button
          onClick={() => {
            setFormMode("add");
            setNewSanPham({
              id: 0,
              tenSanPham: "",
              soLuong: 0,
              gia: 0,
              donVi: "",
              loai: "",
              hinhAnh: "",
              nhaSanXuatId: 0,
            });
          }}
          className="mb-4 bg-green-600 text-white px-4 py-2"
        >
          + THÊM SẢN PHẨM
        </button>
      )}

      {formMode !== null && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-xl font-medium mb-2">
            {isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditing ? handleUpdateSanPham() : handleAddSanPham();
            }}
            className="grid grid-cols-2 gap-2"
          >
            {Object.entries(newSanPham).map(([key, value]) => (
              <input
                key={key}
                type={typeof value === "number" ? "number" : "text"}
                placeholder={key}
                value={value || ""}
                onChange={(e) =>
                  setNewSanPham({
                    ...newSanPham,
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
            <th className="px-4 py-2 border">Tên Sản phẩm</th>
            <th className="px-4 py-2 border">Số lượng</th>
            <th className="px-4 py-2 border">Giá</th>
            <th className="px-4 py-2 border">Đơn vị</th>
            <th className="px-4 py-2 border">Loại</th>
            <th className="px-4 py-2 border">Hình ảnh</th>
            <th className="px-4 py-2 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sanPhams.map((sanPham) => (
            <tr key={sanPham.id}>
              <td className="px-4 py-2 border">{sanPham.id}</td>
              <td className="px-4 py-2 border">{sanPham.tenSanPham}</td>
              <td className="px-4 py-2 border">{sanPham.soLuong}</td>
              <td className="px-4 py-2 border">{sanPham.gia}</td>
              <td className="px-4 py-2 border">{sanPham.donVi}</td>
              <td className="px-4 py-2 border">{sanPham.loai}</td>
              <td className="px-4 py-2 border">
                <img
                  src={sanPham.hinhAnh}
                  alt={sanPham.tenSanPham}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => {
                    setNewSanPham(sanPham);
                    setFormMode("edit");
                  }}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  SỬA
                </button>
                <button
                  onClick={() => handleDeleteSanPham(sanPham.id)}
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

export default SanPhamList;
