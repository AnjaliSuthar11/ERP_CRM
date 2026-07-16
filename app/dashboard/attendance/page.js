"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "PRESENT",
    remarks: "",
  });

  const loadData = async () => {
    const [attendanceRes, employeeRes] =
      await Promise.all([
        axios.get("/api/attendance"),
        axios.get("/api/users"),
      ]);

    setAttendance(
      attendanceRes.data.attendance
    );

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
        "/api/attendance",
        form
      );

      toast.success(res.data.message);

      setShowForm(false);

      setForm({
        employee: "",
        date: "",
        checkIn: "",
        checkOut: "",
        status: "PRESENT",
        remarks: "",
      });

      loadData();
    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  const deleteAttendance = async (id) => {
    await axios.delete(
      `/api/attendance/${id}`
    );

    toast.success("Deleted");

    loadData();
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Attendance
        </h1>

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >
          <Plus size={18} />
          Mark Attendance
        </button>

      </div>

      {showForm && (
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-5 mb-8"
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

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            type="time"
            name="checkIn"
            value={form.checkIn}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            type="time"
            name="checkOut"
            value={form.checkOut}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          >
            <option value="PRESENT">
              Present
            </option>
            <option value="ABSENT">
              Absent
            </option>
            <option value="HALF_DAY">
              Half Day
            </option>
            <option value="LEAVE">
              Leave
            </option>
          </select>

          <textarea
            rows="4"
            name="remarks"
            value={form.remarks}
            onChange={changeHandler}
            placeholder="Remarks"
            className="border rounded-lg p-3"
          />

          <button className="bg-blue-600 text-white rounded-lg py-3">
            Save Attendance
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
                Date
              </th>
              <th className="p-4 text-left">
                Check In
              </th>
              <th className="p-4 text-left">
                Check Out
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

            {attendance.map((item) => (

              <tr
                key={item._id}
                className="border-t"
              >

                <td className="p-4">
                  {item.employee?.firstName}{" "}
                  {item.employee?.lastName}
                </td>

                <td className="p-4">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {item.checkIn}
                </td>

                <td className="p-4">
                  {item.checkOut}
                </td>

                <td className="p-4">
                  {item.status}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteAttendance(
                        item._id
                      )
                    }
                  >
                    <Trash2 className="text-red-600" size={18} />
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