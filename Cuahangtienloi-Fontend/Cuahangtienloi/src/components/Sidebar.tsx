import React from "react";
import {
  Home,
  ShoppingCart,
  Users,
  UserCog,
  Truck,
  Receipt,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-100 w-64 min-h-screen p-4 shadow-md">
      <nav className="space-y-4">
        <Link to="/" className="flex items-center space-x-2 hover:text-blue-600">
          <Home size={20} />
          <span>TRANG ADMIN</span>
        </Link>

        <Link to="/sanpham" className="flex items-center space-x-2 hover:text-blue-600">
          <ShoppingCart size={20} />
          <span>SẢN PHẨM</span>
        </Link>

        <Link to="/khachhang" className="flex items-center space-x-2 hover:text-blue-600">
          <Users size={20} />
          <span>KHÁCH HÀNG</span>
        </Link>

        <Link to="/users" className="flex items-center space-x-2 hover:text-blue-600">
          <UserCog size={20} />
          <span>NGƯỜI DÙNG</span>
        </Link>

        <Link to="/nhanvien" className="flex items-center space-x-2 hover:text-blue-600">
          <UserCog size={20} />
          <span>NHÂN VIÊN</span>
        </Link>

        <Link to="/nhacungcap" className="flex items-center space-x-2 hover:text-blue-600">
          <Truck size={20} />
          <span>NHÀ CUNG CẤP</span>
        </Link>

        <Link to="/hoadon" className="flex items-center space-x-2 hover:text-blue-600">
          <Receipt size={20} />
          <span>HÓA ĐƠN</span>
        </Link>

        <Link to="/chitiethoadon" className="flex items-center space-x-2 hover:text-blue-600">
          <FileText size={20} />
          <span>CHI TIẾT HÓA ĐƠN</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
