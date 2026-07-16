"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function LeadsPage() {

  const [leads, setLeads] = useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] = useState({

    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    source: "WEBSITE",
    stage: "NEW",
    expectedValue: "",
    assignedTo: "",
    nextFollowUp: "",
    notes: "",

  });

  const loadData = async () => {

    const [leadRes, userRes] =
      await Promise.all([
        axios.get("/api/leads"),
        axios.get("/api/users"),
      ]);

    setLeads(leadRes.data.leads);

    setEmployees(userRes.data.users);

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

    const res = await axios.post(
      "/api/leads",
      form
    );

    toast.success(res.data.message);

    setShowForm(false);

    loadData();

  };

  const deleteLead = async (id) => {

    await axios.delete(
      `/api/leads/${id}`
    );

    toast.success("Lead Deleted");

    loadData();

  };

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">

          Leads

        </h1>

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >

          <Plus size={18}/>

          Add Lead

        </button>

      </div>

      {

        showForm && (

          <form
            onSubmit={submitHandler}
            className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-5 mb-8"
          >

            <input
              name="leadName"
              placeholder="Lead Name"
              value={form.leadName}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <input
              name="companyName"
              placeholder="Company"
              value={form.companyName}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <select
              name="source"
              value={form.source}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            >

              <option value="WEBSITE">Website</option>

              <option value="GOOGLE">Google</option>

              <option value="FACEBOOK">Facebook</option>

              <option value="INSTAGRAM">Instagram</option>

              <option value="LINKEDIN">LinkedIn</option>

              <option value="REFERRAL">Referral</option>

              <option value="OTHER">Other</option>

            </select>

            <select
              name="stage"
              value={form.stage}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            >

              <option value="NEW">New</option>

              <option value="CONTACTED">
                Contacted
              </option>

              <option value="QUALIFIED">
                Qualified
              </option>

              <option value="PROPOSAL_SENT">
                Proposal Sent
              </option>

              <option value="NEGOTIATION">
                Negotiation
              </option>

              <option value="WON">Won</option>

              <option value="LOST">Lost</option>

            </select>

            <input
              type="number"
              name="expectedValue"
              placeholder="Expected Value"
              value={form.expectedValue}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <input
              type="date"
              name="nextFollowUp"
              value={form.nextFollowUp}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            />

            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={changeHandler}
              className="border rounded-lg p-3"
            >

              <option value="">

                Assign Employee

              </option>

              {

                employees.map(employee=>(

                  <option
                    key={employee._id}
                    value={employee._id}
                  >

                    {employee.firstName} {employee.lastName}

                  </option>

                ))

              }

            </select>

            <textarea
              rows={5}
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={changeHandler}
              className="border rounded-lg p-3 md:col-span-2"
            />

            <button className="bg-blue-600 text-white py-3 rounded-lg">

              Save Lead

            </button>

          </form>

        )

      }

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Lead</th>

              <th className="p-4 text-left">Company</th>

              <th className="p-4 text-left">Stage</th>

              <th className="p-4 text-left">Assigned To</th>

              <th className="p-4 text-left">Value</th>

              <th className="p-4 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {

              leads.map(lead=>(

                <tr
                  key={lead._id}
                  className="border-t"
                >

                  <td className="p-4">

                    {lead.leadName}

                  </td>

                  <td className="p-4">

                    {lead.companyName}

                  </td>

                  <td className="p-4">

                    {lead.stage}

                  </td>

                  <td className="p-4">

                    {lead.assignedTo?.firstName}{" "}
                    {lead.assignedTo?.lastName}

                  </td>

                  <td className="p-4">

                    ₹ {lead.expectedValue}

                  </td>

                  <td className="p-4 flex gap-3">

                    <button>

                      <Pencil size={18}/>

                    </button>

                    <button
                      onClick={()=>deleteLead(lead._id)}
                    >

                      <Trash2
                        size={18}
                        className="text-red-600"
                      />

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}