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

interface Booking {
  _id: string;
  user_id: string;
  vehicle_id: string;
  pickup_location: string;
  drop_location: string;
  booking_date: string;
  status: string;
  trip_status: string;
}

export default function BookingsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_id: "",
    pickup_location: "",
    drop_location: "",
    booking_date: "",
  });
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("tm_token");
    const userRole = localStorage.getItem("tm_role");
    const id = localStorage.getItem("tm_user_id");
    setRole(userRole);
    setUserId(id);
    
    if (!token) {
      setError("Please login to view and create bookings");
      setLoading(false);
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch available vehicles
      const vehiclesRes = await fetch("/api/vehicles?status=available&limit=100");
      const vehiclesData = await vehiclesRes.json();
      if (vehiclesData.data) {
        setVehicles(vehiclesData.data);
      }

      // Fetch user's bookings
      const token = localStorage.getItem("tm_token");
      const bookingsRes = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setMyBookings(bookingsData);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("tm_token");
    
    if (!token) {
      setError("Please login to create bookings");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create booking");
        return;
      }

      setShowForm(false);
      setFormData({ vehicle_id: "", pickup_location: "", drop_location: "", booking_date: "" });
      fetchData();
    } catch (err) {
      setError("An error occurred");
    }
  };

  const handleCancel = async (bookingId: string) => {
    const token = localStorage.getItem("tm_token");
    if (!token) return;

    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      setError("Failed to cancel booking");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "booked":
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "on_route":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
        <p className="text-gray-600 mb-4">You need to login to view and create bookings.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "+ New Booking"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Create New Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Vehicle
              </label>
              <select
                value={formData.vehicle_id}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle_id: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.vehicle_number} - {v.vehicle_type} (Capacity: {v.capacity})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pickup Location
              </label>
              <input
                type="text"
                value={formData.pickup_location}
                onChange={(e) =>
                  setFormData({ ...formData, pickup_location: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Chennai Central"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Drop Location
              </label>
              <input
                type="text"
                value={formData.drop_location}
                onChange={(e) =>
                  setFormData({ ...formData, drop_location: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Bangalore City"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Booking Date
              </label>
              <input
                type="datetime-local"
                value={formData.booking_date}
                onChange={(e) =>
                  setFormData({ ...formData, booking_date: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Booking
            </button>
          </form>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-700">Your Bookings</h2>
      {myBookings.length === 0 ? (
        <p className="text-gray-600">No bookings found. Create your first booking!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Pickup</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Drop</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Trip Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.pickup_location}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.drop_location}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(booking.booking_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.trip_status)}`}>
                      {booking.trip_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {booking.status !== "cancelled" && booking.status !== "completed" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Cancel
                      </button>
                    )}
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

