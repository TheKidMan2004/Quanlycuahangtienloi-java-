import React, { useEffect, useState } from "react";
import axios from "axios";

interface HoaDon {
  id: number;
   khachHangId: number;
  nhanVienId: number;
  ngayTao: string;
  tongTien: number;

}

const HoaDonList: React.FC = () => {
  const [hoaDonList, setHoaDonList] = useState<HoaDon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Đổi newHoaDon thành kiểu HoaDon (bao gồm id khi cần)
  const [newHoaDon, setNewHoaDon] = useState<HoaDon>({
    id: 0,  // Đảm bảo có id khi ở chế độ chỉnh sửa
    ngayTao: "",  // Tự động thêm vào khi thêm mới
    tongTien: 0,  // Tự động tính
    nhanVienId: 0,
    khachHangId: 0,
  });

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/hoadon/all")
      .then((response) => {
        setHoaDonList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu.");
        setLoading(false);
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  const handleAddHoaDon = () => {
    const hoaDonData = {
      nhanVienId: newHoaDon.nhanVienId,
      khachHangId: newHoaDon.khachHangId,
    };
    axios
      .post("http://localhost:8080/hoadon/add", hoaDonData)
      .then(() => {
        setHoaDonList([...hoaDonList, { ...hoaDonData, id: Date.now(), ngayTao: new Date().toISOString(), tongTien: 0 }]);
        resetForm();
        alert("Thêm hóa đơn thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi thêm hóa đơn.");
        console.error("Lỗi khi thêm hóa đơn:", err);
      });
  };

  const handleUpdateHoaDon = () => {
    axios
      .put(`http://localhost:8080/hoadon/update/${newHoaDon.id}`, newHoaDon)
      .then(() => {
        const updated = hoaDonList.map((item) =>
          item.id === newHoaDon.id ? { ...item, ...newHoaDon } : item
        );
        setHoaDonList(updated);
        resetForm();
        alert("Cập nhật hóa đơn thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi cập nhật hóa đơn.");
        console.error("Lỗi khi cập nhật hóa đơn:", err);
      });
  };

  const handleDeleteHoaDon = (id: number) => {
    axios
      .delete(`http://localhost:8080/hoadon/delete/${id}`)
      .then(() => {
        setHoaDonList(hoaDonList.filter((hd) => hd.id !== id));
        alert("Xóa hóa đơn thành công!");
      })
      .catch((err) => {
        alert("Lỗi khi xóa hóa đơn.");
        console.error("Lỗi khi xóa hóa đơn:", err);
      });
  };

  const resetForm = () => {
    setNewHoaDon({
      id: 0,
      ngayTao: "",
      tongTien: 0,
      nhanVienId: 0,
      khachHangId: 0,
    });
    setFormMode(null);
  };

  const isEditing = formMode === "edit";

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">DANH SÁCH HÓA ĐƠN</h1>

      {formMode === null && (
        <button
          onClick={() => {
            setFormMode("add");
            setNewHoaDon({
              id: 0,
              ngayTao: "",
              tongTien: 0,
              nhanVienId: 0,
              khachHangId: 0,
            });
          }}
          className="mb-4 bg-green-600 text-white px-4 py-2"
        >
          + THÊM HÓA ĐƠN
        </button>
      )}

      {formMode !== null && (
        <div className="mb-4 border p-4 rounded">
          <h2 className="text-xl font-medium mb-2">
            {isEditing ? "Sửa hóa đơn" : "Thêm hóa đơn"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditing ? handleUpdateHoaDon() : handleAddHoaDon();
            }}
            className="grid grid-cols-2 gap-2"
          >
            <input
              type="number"
              placeholder="Nhân viên ID"
              value={newHoaDon.nhanVienId || ""}
              onChange={(e) =>
                setNewHoaDon({
                  ...newHoaDon,
                  nhanVienId: Number(e.target.value),
                })
              }
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Khách hàng ID"
              value={newHoaDon.khachHangId || ""}
              onChange={(e) =>
                setNewHoaDon({
                  ...newHoaDon,
                  khachHangId: Number(e.target.value),
                })
              }
              className="border p-2"
            />
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
            <th className="px-4 py-2 border">Ngày tạo</th>
            <th className="px-4 py-2 border">Tổng tiền</th>
            <th className="px-4 py-2 border">Khách hàng ID</th>
            <th className="px-4 py-2 border">Nhân viên ID</th>
            <th className="px-4 py-2 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {hoaDonList.map((hd) => (
            <tr key={hd.id}>
              <td className="px-4 py-2 border">{hd.id}</td>
              <td className="px-4 py-2 border">{hd.ngayTao}</td>
              <td className="px-4 py-2 border">{hd.tongTien}</td>
              <td className="px-4 py-2 border">{hd.khachHangId}</td>
              <td className="px-4 py-2 border">{hd.nhanVienId}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => {
                    setNewHoaDon(hd);
                    setFormMode("edit");
                  }}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  SỬA
                </button>
                <button
                  onClick={() => handleDeleteHoaDon(hd.id)}
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

export default HoaDonList;
