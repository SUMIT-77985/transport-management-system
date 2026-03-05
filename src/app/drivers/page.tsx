"use client";

import { useEffect, useState } from "react";

interface Driver {
  _id: string;
  name: string;
  license_number: string;
  phone: string;
  assigned_vehicle?: string;
  status?: string;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    license_number: "",
    phone: "",
    assigned_vehicle: "",
  });
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("tm_role");
    setRole(userRole);
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("/api/drivers");
      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      setError("Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("tm_token");
    
    if (!token) {
      setError("Please login as admin to add drivers");
      return;
    }

    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create driver");
        return;
      }

      setShowForm(false);
      setFormData({ name: "", license_number: "", phone: "", assigned_vehicle: "" });
      fetchDrivers();
    } catch (err) {
      setError("An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Drivers</h1>
        {role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showForm ? "Cancel" : "+ Add Driver"}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Add New Driver</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Driver name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                License Number
              </label>
              <input
                type="text"
                value={formData.license_number}
                onChange={(e) =>
                  setFormData({ ...formData, license_number: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="DL-12345678"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91 9876543210"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned Vehicle (optional)
              </label>
              <input
                type="text"
                value={formData.assigned_vehicle}
                onChange={(e) =>
                  setFormData({ ...formData, assigned_vehicle: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Vehicle ID"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Driver
            </button>
          </form>
        </div>
      )}

      {drivers.length === 0 ? (
        <p className="text-gray-600">No drivers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">License Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Assigned Vehicle</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drivers.map((driver) => (
                <tr key={driver._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.license_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {driver.assigned_vehicle || "Not assigned"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {driver.status || "active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

