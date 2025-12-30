import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/users?page=${page}`);
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedUser) return;

    try {
      await api.patch(
        `/users/${
          selectedUser.isActive ? "deactivate" : "activate"
        }/${selectedUser._id}`
      );

      toast.success(
        selectedUser.isActive
          ? "User deactivated"
          : "User activated"
      );

      setModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch {
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
  <div className="max-w-7xl mx-auto">
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 md:px-8 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Admin Dashboard
        </h2>
        <p className="text-blue-100 mt-1 text-sm md:text-base">
          Manage users and their account status
        </p>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Table Container */}
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-slate-200">
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="hover:bg-slate-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {u.fullName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                        {u.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            u.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {u.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        <button
                          onClick={() => openConfirmModal(u)}
                          className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                            u.isActive
                              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          }`}
                        >
                          {u.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6">
              <Pagination page={page} setPage={setPage} hasMore />
            </div>
          </>
        )}
      </div>
    </div>
  </div>

  {/* Confirmation Modal */}
  <Modal
    open={modalOpen}
    title={`Are you sure you want to ${
      selectedUser?.isActive ? "deactivate" : "activate"
    } this user?`}
    onClose={() => setModalOpen(false)}
    onConfirm={handleConfirm}
  />
</div>
  );
};

export default AdminDashboard;
