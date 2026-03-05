"use client";

import { useEffect, useState } from "react";

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

export default function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vehicles
        const vehiclesRes = await fetch("/api/vehicles?limit=100");
        const vehiclesData = await vehiclesRes.json();
        if (vehiclesData.data) {
          setVehicles(vehiclesData.data);
        }

        // Try to fetch bookings using the public endpoint
        try {
          const bookingsRes = await fetch("/api/admin/bookings");
          if (bookingsRes.ok) {
            const bookingsData = await bookingsRes.json();
            setBookings(bookingsData);
          }
        } catch (bookingsErr) {
          console.log("Could not fetch bookings");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Vehicles Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Vehicles</h2>
        {vehicles.length === 0 ? (
          <p className="text-gray-600">No vehicles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Vehicle Number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Capacity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{vehicle.vehicle_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">{vehicle.vehicle_type}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{vehicle.capacity}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Bookings Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bookings</h2>
        {bookings.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              No bookings found.{" "}
              <a href="/login" className="underline font-medium">Login</a> to view your bookings.
            </p>
          </div>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Stats Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold">{vehicles.length}</div>
            <div className="text-blue-100">Total Vehicles</div>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold">{vehicles.filter(v => v.status === 'available').length}</div>
            <div className="text-green-100">Available</div>
          </div>
          <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold">{bookings.length}</div>
            <div className="text-purple-100">Total Bookings</div>
          </div>
          <div className="bg-orange-500 text-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold">{bookings.filter(b => b.trip_status === 'on_route').length}</div>
            <div className="text-orange-100">Active Trips</div>
          </div>
        </div>
      </section>
    </div>
  );
}

