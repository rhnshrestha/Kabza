export default function AdminDashboard() {
  const stats = [
    { title: "Total Bookings", value: 120 },
    { title: "Pending", value: 18 },
    { title: "Confirmed", value: 82 },
    { title: "Cancelled", value: 20 },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-6 border-l-4 border-black"
          >
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
