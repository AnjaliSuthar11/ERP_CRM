"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ProjectsPage() {

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    projectName: "",
    projectCode: "",
    client: "",
    manager: "",
    startDate: "",
    endDate: "",
    budget: "",
    priority: "MEDIUM",
    description: "",
  });

  const loadData = async () => {

    const [projectRes, clientRes, userRes] =
      await Promise.all([
        axios.get("/api/projects"),
        axios.get("/api/clients"),
        axios.get("/api/users"),
      ]);

    setProjects(projectRes.data.projects);
    setClients(clientRes.data.clients);
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

    const res = await axios.post(
      "/api/projects",
      form
    );

    toast.success(res.data.message);

    setShowForm(false);

    loadData();
  };

  const deleteProject = async (id) => {

    await axios.delete(`/api/projects/${id}`);

    toast.success("Project Deleted");

    loadData();

  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >
          <Plus size={18} />
          Add Project
        </button>

      </div>

      {/* Form continues in next response */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Project</th>

              <th className="p-4 text-left">Client</th>

              <th className="p-4 text-left">Manager</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Progress</th>

              <th className="p-4 text-left">Action</th>

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
                  {project.client?.companyName}
                </td>

                <td className="p-4">
                  {project.manager?.firstName}{" "}
                  {project.manager?.lastName}
                </td>

                <td className="p-4">
                  {project.status}
                </td>

                <td className="p-4">
                  {project.progress}%
                </td>

                <td className="p-4 flex gap-3">

                  <button>
                    <Pencil size={18}/>
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