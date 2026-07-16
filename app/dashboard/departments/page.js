"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
  });

  const getDepartments = async () => {
    try {
      const res = await axios.get("/api/departments");

      setDepartments(res.data.departments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDepartments();
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
      const res = await axios.post(
        "/api/departments",
        form
      );

      toast.success(res.data.message);

      setForm({
        name: "",
        code: "",
        description: "",
      });

      getDepartments();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h1 className="text-2xl font-bold mb-6">

          Create Department

        </h1>

        <form
          onSubmit={submitHandler}
          className="grid md:grid-cols-3 gap-5"
        >

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={changeHandler}
            placeholder="Department Name"
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="text"
            name="code"
            value={form.code}
            onChange={changeHandler}
            placeholder="Department Code"
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={changeHandler}
            placeholder="Description"
            className="border rounded-lg p-3 outline-none"
          />

          <button className="bg-blue-600 text-white rounded-lg p-3">
            Create Department
          </button>

        </form>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Code
              </th>

              <th className="text-left p-4">
                Description
              </th>

            </tr>

          </thead>

          <tbody>

            {departments.map((department) => (

              <tr
                key={department._id}
                className="border-t"
              >

                <td className="p-4">
                  {department.name}
                </td>

                <td className="p-4">
                  {department.code}
                </td>

                <td className="p-4">
                  {department.description}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}