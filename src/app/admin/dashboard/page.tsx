export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <a href="/admin/products" className="rounded-xl border p-6">
          Manage Products
        </a>

        <a href="/admin/orders" className="rounded-xl border p-6">
          View Orders
        </a>
      </div>
    </div>
  );
}
