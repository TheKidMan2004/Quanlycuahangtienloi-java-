import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  trangThai: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: "",
    password: "",
    role: "",
    trangThai: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/users/all")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Lỗi khi tải dữ liệu người dùng.");
        setLoading(false);
      });
  };

  const resetForm = () => {
    setFormData({ id: 0, username: "", password: "", role: "", trangThai: "" });
    setFormMode(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { id, username, password, role, trangThai } = formData;
    if (!id || !username || !password || !role || !trangThai) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (formMode === "add") {
      axios
        .post("http://localhost:8080/users/add", formData)
        .then((res) => {
          setUsers([...users, res.data]);
          alert("Thêm người dùng thành công!");
          resetForm();
        })
        .catch(() => {
          alert("Lỗi khi thêm người dùng.");
        });
    } else if (formMode === "edit") {
      axios
        .put(`http://localhost:8080/users/update/${formData.id}`, formData)
        .then((res) => {
          setUsers(users.map((u) => (u.id === formData.id ? res.data : u)));
          alert("Cập nhật người dùng thành công!");
          resetForm();
        })
        .catch(() => {
          alert("Lỗi khi cập nhật người dùng.");
        });
    }
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setFormMode("edit");
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

    axios
      .delete(`http://localhost:8080/users/delete/${id}`)
      .then(() => {
        setUsers(users.filter((u) => u.id !== id));
        alert("Xóa người dùng thành công!");
      })
      .catch(() => {
        alert("Lỗi khi xóa người dùng.");
      });
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      {formMode === null ? (
        <button
          className="bg-green-600 text-white px-4 py-2 mb-4"
          onClick={() => setFormMode("add")}
        >
          + Thêm người dùng
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4 border p-4 rounded">
          <input
            type="number"
            placeholder="ID (tự nhập)"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: +e.target.value })}
            className="border p-2"
            disabled={formMode === "edit"}
          />
          <input
            type="text"
            placeholder="Tên người dùng"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Vai trò"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Trạng thái"
            value={formData.trangThai}
            onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
            className="border p-2"
          />

          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">
              {formMode === "add" ? "Lưu" : "Cập nhật"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Mật khẩu</th>
            <th className="border px-4 py-2">Vai trò</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.id}</td>
              <td className="border px-4 py-2">{u.username}</td>
              <td className="border px-4 py-2">{u.password}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2">{u.trangThai}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-2 py-1"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
