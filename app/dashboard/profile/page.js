import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="bg-white rounded-xl p-8 shadow">

      <h1 className="text-3xl font-bold mb-8">

        My Profile

      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="font-semibold">

            First Name

          </label>

          <input
            readOnly
            value={user.firstName}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">

            Last Name

          </label>

          <input
            readOnly
            value={user.lastName}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">

            Email

          </label>

          <input
            readOnly
            value={user.email}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">

            Phone

          </label>

          <input
            readOnly
            value={user.phone}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">

            Department

          </label>

          <input
            readOnly
            value={user.department}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">

            Role

          </label>

          <input
            readOnly
            value={user.role}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

      </div>

    </div>
  );
}