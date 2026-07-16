"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    assignedBy: "",
    priority: "MEDIUM",
    dueDate: "",
  });

  const loadData = async () => {
    const [taskRes, projectRes, userRes] = await Promise.all([
      axios.get("/api/tasks"),
      axios.get("/api/projects"),
      axios.get("/api/users"),
    ]);

    setTasks(taskRes.data.tasks);
    setProjects(projectRes.data.projects);
    setEmployees(userRes.data.users);
  };

  useEffect(() => {
    loadData();
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
      const res = await axios.post("/api/tasks", form);

      toast.success(res.data.message);

      setShowForm(false);

      setForm({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        assignedBy: "",
        priority: "MEDIUM",
        dueDate: "",
      });

      loadData();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);

    toast.success("Task Deleted");

    loadData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={submitHandler}
          className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-5 mb-8"
        >
          <input
            name="title"
            value={form.title}
            onChange={changeHandler}
            placeholder="Task Title"
            className="border rounded-lg p-3"
          />

          <select
            name="project"
            value={form.project}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.projectName}
              </option>
            ))}
          </select>

          <select
            name="assignedTo"
            value={form.assignedTo}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          >
            <option value="">Assign To</option>

            {employees.map((employee) => (
              <option
                key={employee._id}
                value={employee._id}
              >
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>

          <select
            name="assignedBy"
            value={form.assignedBy}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          >
            <option value="">Assigned By</option>

            {employees.map((employee) => (
              <option
                key={employee._id}
                value={employee._id}
              >
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={changeHandler}
            placeholder="Description"
            className="border rounded-lg p-3 md:col-span-2"
          />

          <button className="bg-blue-600 text-white py-3 rounded-lg">
            Create Task
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-left">Assigned To</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border-t"
              >
                <td className="p-4">{task.title}</td>

                <td className="p-4">
                  {task.project?.projectName}
                </td>

                <td className="p-4">
                  {task.assignedTo?.firstName}{" "}
                  {task.assignedTo?.lastName}
                </td>

                <td className="p-4">
                  {task.priority}
                </td>

                <td className="p-4">
                  {task.status}
                </td>

                <td className="p-4 flex gap-3">
                  <button>
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
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