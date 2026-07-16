"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

export default function LeavePage() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    leaveType: "CASUAL",
    fromDate: "",
    toDate: "",
    totalDays: "",
    reason: "",
  });

  const loadData = async () => {
    const [leaveRes, employeeRes] =
      await Promise.all([
        axios.get("/api/leaves"),
        axios.get("/api/users"),
      ]);

    setLeaves(leaveRes.data.leaves);
    setEmployees(employeeRes.data.users);
  };

  useEffect(() => {
    loadData();
  }, []);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/leaves",
        form
      );

      toast.success(res.data.message);

      setShowForm(false);

      setForm({
        employee: "",
        leaveType: "CASUAL",
        fromDate: "",
        toDate: "",
        totalDays: "",
        reason: "",
      });

      loadData();
    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  const deleteLeave = async (id) => {
    await axios.delete(
      `/api/leaves/${id}`
    );

    toast.success("Deleted");

    loadData();
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">

          Leave Management

        </h1>

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >
          <Plus size={18} />
          Apply Leave
        </button>

      </div>

      {showForm && (

        <form
          onSubmit={submitHandler}
          className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-5 mb-8"
        >

          <select
            name="employee"
            value={form.employee}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          >
            <option value="">
              Select Employee
            </option>

            {employees.map((employee) => (
              <option
                key={employee._id}
                value={employee._id}
              >
                {employee.firstName}{" "}
                {employee.lastName}
              </option>
            ))}

          </select>

          <select
            name="leaveType"
            value={form.leaveType}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          >
            <option value="CASUAL">Casual</option>
            <option value="SICK">Sick</option>
            <option value="EARNED">Earned</option>
            <option value="MATERNITY">Maternity</option>
            <option value="PATERNITY">Paternity</option>
            <option value="UNPAID">Unpaid</option>
          </select>

          <input
            type="date"
            name="fromDate"
            value={form.fromDate}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            name="toDate"
            value={form.toDate}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="totalDays"
            value={form.totalDays}
            onChange={changeHandler}
            placeholder="Total Days"
            className="border rounded-lg p-3"
          />

          <textarea
            rows="4"
            name="reason"
            value={form.reason}
            onChange={changeHandler}
            placeholder="Reason"
            className="border rounded-lg p-3"
          />

          <button className="bg-blue-600 text-white py-3 rounded-lg">
            Submit Leave
          </button>

        </form>

      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                From
              </th>

              <th className="p-4 text-left">
                To
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr
                key={leave._id}
                className="border-t"
              >

                <td className="p-4">
                  {leave.employee?.firstName}{" "}
                  {leave.employee?.lastName}
                </td>

                <td className="p-4">
                  {leave.leaveType}
                </td>

                <td className="p-4">
                  {new Date(
                    leave.fromDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(
                    leave.toDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {leave.status}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteLeave(
                        leave._id
                      )
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