"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function EmployeesPage() {
  const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    role: "EMPLOYEE",
  });

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data.users);
    } catch (err) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users", form);

      toast.success(res.data.message);

      setShowForm(false);

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        designation: "",
        role: "EMPLOYEE",
      });

      getUsers();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/api/users/${id}`);

      toast.success(res.data.message);

      getUsers();
    } catch (err) {}
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white flex items-center gap-2 px-5 py-3 rounded-lg"
        >
          <Plus size={18} />

          Add Employee
        </button>

      </div>

      {showForm && (
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-xl shadow mb-8 grid md:grid-cols-2 gap-5"
        >
          <input
            name="firstName"
            placeholder="First Name"
            onChange={changeHandler}
            value={form.firstName}
            className="border p-3 rounded-lg"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            onChange={changeHandler}
            value={form.lastName}
            className="border p-3 rounded-lg"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            value={form.email}
            className="border p-3 rounded-lg"
          />

          <input
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            value={form.password}
            className="border p-3 rounded-lg"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={changeHandler}
            value={form.phone}
            className="border p-3 rounded-lg"
          />

          <input
            name="department"
            placeholder="Department"
            onChange={changeHandler}
            value={form.department}
            className="border p-3 rounded-lg"
          />

          <input
            name="designation"
            placeholder="Designation"
            onChange={changeHandler}
            value={form.designation}
            className="border p-3 rounded-lg"
          />

          <select
            name="role"
            value={form.role}
            onChange={changeHandler}
            className="border p-3 rounded-lg"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="HR">HR</option>
            <option value="FINANCE">Finance</option>
            <option value="BUSINESS_DEVELOPMENT">
              Business Development
            </option>
          </select>

          <button className="bg-blue-600 text-white rounded-lg py-3">
            Save Employee
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t"
              >
                <td className="p-4">
                  {user.firstName} {user.lastName}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">
                  {user.department}
                </td>

                <td className="p-4 flex gap-3">

                  <button>

                    <Pencil size={18} />

                  </button>

                  <button
                    onClick={() =>
                      deleteUser(user._id)
                    }
                  >
                    <Trash2
                      size={18}
                      className="text-red-600"
                    />
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}