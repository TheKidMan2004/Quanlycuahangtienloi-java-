// src/components/AdminPage.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import SanPhamList from "./sanphamlist";
import KhachHangList from "./khachhanglist";
import UsersList from "./userslist";
import NhanVienList from "./nhanvienlist";
import NhaSanXuatList from "./nhasanxuatlist";
import HoaDonList from "./hoadonlist";
import ChiTietHoaDonList from "./chitiethoadonlist";
import AdminHome from "./AdminHome"; // trang chào mừng admin

const AdminPage = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/sanpham" element={<SanPhamList />} />
        <Route path="/khachhang" element={<KhachHangList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/nhanvien" element={<NhanVienList />} />
        <Route path="/nhacungcap" element={<NhaSanXuatList />} />
        <Route path="/hoadon" element={<HoaDonList />} />
        <Route path="/chitiethoadon" element={<ChiTietHoaDonList />} />
      </Routes>
    </Layout>
  );
};

export default AdminPage;
