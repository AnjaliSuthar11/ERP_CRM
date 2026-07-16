"use client";

import { useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus,Trash2,Pencil } from "lucide-react";

export default function ClientsPage(){

const [clients,setClients]=useState([]);

const [showForm,setShowForm]=useState(false);

const [form,setForm]=useState({

companyName:"",
contactPerson:"",
email:"",
phone:"",
website:"",
industry:"",
address:"",
city:"",
state:"",
country:"",

});

const getClients=async()=>{

const res=await axios.get("/api/clients");

setClients(res.data.clients);

};

useEffect(()=>{

getClients();

},[]);

const changeHandler=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value,

});

};

const submitHandler=async(e)=>{

e.preventDefault();

const res=await axios.post("/api/clients",form);

toast.success(res.data.message);

setShowForm(false);

setForm({

companyName:"",
contactPerson:"",
email:"",
phone:"",
website:"",
industry:"",
address:"",
city:"",
state:"",
country:"",

});

getClients();

};

const deleteClient=async(id)=>{

await axios.delete(`/api/clients/${id}`);

toast.success("Deleted");

getClients();

};

return(

<div>

<div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold">

Clients

</h1>

<button
onClick={()=>setShowForm(!showForm)}
className="bg-blue-600 text-white px-5 py-3 rounded-lg flex gap-2"
>

<Plus size={18}/>

Add Client

</button>

</div>

{
showForm && (

<form
onSubmit={submitHandler}
className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-5 mb-8"
>

<input
name="companyName"
placeholder="Company Name"
value={form.companyName}
onChange={changeHandler}
className="border rounded-lg p-3"
/>

<input
name="contactPerson"
placeholder="Contact Person"
value={form.contactPerson}
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

<input
name="website"
placeholder="Website"
value={form.website}
onChange={changeHandler}
className="border rounded-lg p-3"
/>

<input
name="industry"
placeholder="Industry"
value={form.industry}
onChange={changeHandler}
className="border rounded-lg p-3"
/>

<input
name="city"
placeholder="City"
value={form.city}
onChange={changeHandler}
className="border rounded-lg p-3"
/>

<input
name="state"
placeholder="State"
value={form.state}
onChange={changeHandler}
className="border rounded-lg p-3"
/>

<input
name="country"
placeholder="Country"
value={form.country}
onChange={changeHandler}
className="border rounded-lg p-3"
/>

<textarea
rows={4}
name="address"
placeholder="Address"
value={form.address}
onChange={changeHandler}
className="border rounded-lg p-3 md:col-span-2"
/>

<button
className="bg-blue-600 text-white py-3 rounded-lg"
>

Save Client

</button>

</form>

)

}

<div className="bg-white rounded-xl shadow overflow-hidden">

<table className="w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-4 text-left">

Company

</th>

<th className="p-4 text-left">

Contact

</th>

<th className="p-4 text-left">

Email

</th>

<th className="p-4 text-left">

Phone

</th>

<th className="p-4 text-left">

Action

</th>

</tr>

</thead>

<tbody>

{

clients.map(client=>(

<tr
key={client._id}
className="border-t"
>

<td className="p-4">

{client.companyName}

</td>

<td className="p-4">

{client.contactPerson}

</td>

<td className="p-4">

{client.email}

</td>

<td className="p-4">

{client.phone}

</td>

<td className="p-4 flex gap-3">

<button>

<Pencil size={18}/>

</button>

<button
onClick={()=>deleteClient(client._id)}
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