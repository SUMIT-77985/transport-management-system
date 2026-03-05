"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Vehicle {
  _id: string;
  vehicle_number: string;
  vehicle_type: string;
  capacity: number;
  status: string;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_number: "",
    vehicle_type: "car",
    capacity: 4,
  });
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("tm_token");
    const userRole = localStorage.getItem("tm_role");
    setRole(userRole);
    
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles?limit=100");
      const data = await res.json();
      if (data.data) {
        setVehicles(data.data);
      }
    } catch (err) {
      setError("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("tm_token");
    
    if (!token) {
      setError("Please login as admin to add vehicles");
      return;
    }

    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create vehicle");
        return;
      }

      setShowForm(false);
      setFormData({ vehicle_number: "", vehicle_type: "car", capacity: 4 });
      fetchVehicles();
    } catch (err) {
      setError("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("tm_token");
    if (!token) return;

    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchVehicles();
      }
    } catch (err) {
      setError("Failed to delete vehicle");
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
        <h1 className="text-3xl font-bold text-gray-800">Vehicles</h1>
        {role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showForm ? "Cancel" : "+ Add Vehicle"}
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
          <h2 className="text-xl font-semibold mb-4">Add New Vehicle</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Number
              </label>
              <input
                type="text"
                value={formData.vehicle_number}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle_number: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="TN-01-AB-1234"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Type
              </label>
              <select
                value={formData.vehicle_type}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle_type: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="car">Car</option>
                <option value="van">Van</option>
                <option value="truck">Truck</option>
                <option value="bus">Bus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacity: parseInt(e.target.value) || 0,
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="1"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Vehicle
            </button>
          </form>
        </div>
      )}

      {vehicles.length === 0 ? (
        <p className="text-gray-600">No vehicles found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Vehicle Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                {role === "admin" && (
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {vehicle.vehicle_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                    {vehicle.vehicle_type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {vehicle.capacity}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vehicle.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(vehicle._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

