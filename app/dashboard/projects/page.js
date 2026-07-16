"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    projectName: "",
    projectCode: "",
    clientName: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  const getProjects = async () => {
    const res = await axios.get("/api/projects");
    setProjects(res.data.projects);
  };

  useEffect(() => {
    getProjects();
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
        "/api/projects",
        form
      );

      toast.success(res.data.message);

      setForm({
        projectName: "",
        projectCode: "",
        clientName: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
      });

      setShowForm(false);

      getProjects();
    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  const deleteProject = async (id) => {
    await axios.delete(`/api/projects/${id}`);

    toast.success("Deleted");

    getProjects();
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">

          Projects

        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white flex gap-2 items-center px-5 py-3 rounded-lg"
        >
          <Plus size={18} />

          New Project

        </button>

      </div>

      {showForm && (

        <form
          onSubmit={submitHandler}
          className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-5 mb-8"
        >

          <input
            name="projectName"
            placeholder="Project Name"
            value={form.projectName}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            name="projectCode"
            placeholder="Project Code"
            value={form.projectCode}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            name="clientName"
            placeholder="Client"
            value={form.clientName}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={form.budget}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={changeHandler}
            className="border rounded-lg p-3"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={changeHandler}
            className="border rounded-lg p-3 md:col-span-2"
            rows={5}
          />

          <button className="bg-blue-600 text-white py-3 rounded-lg">

            Create Project

          </button>

        </form>

      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Project
              </th>

              <th className="p-4 text-left">
                Client
              </th>

              <th className="p-4 text-left">
                Budget
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

            {projects.map((project) => (

              <tr
                key={project._id}
                className="border-t"
              >

                <td className="p-4">
                  {project.projectName}
                </td>

                <td className="p-4">
                  {project.clientName}
                </td>

                <td className="p-4">
                  ₹ {project.budget}
                </td>

                <td className="p-4">
                  {project.status}
                </td>

                <td className="p-4 flex gap-3">

                  <button>

                    <Pencil size={18} />

                  </button>

                  <button
                    onClick={() =>
                      deleteProject(project._id)
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