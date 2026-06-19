import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Link from "next/link";
import AdminNavbar from "@/components/AdminNavbar";

export default async function AdminDashboardPage() {
  await connectDB();

  const totalProducts = await Product.countDocuments();

  const totalOrders = await Order.countDocuments();

  const pendingOrders = await Order.countDocuments({
    status: "Pending",
  });

  const deliveredOrders = await Order.countDocuments({
    status: "Delivered",
  });

  const recentOrders = JSON.parse(
    JSON.stringify(
      await Order.find().populate("productId").sort({ createdAt: -1 }).limit(5),
    ),
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl p-6">
        <AdminNavbar />

        <h1 className="text-4xl font-bold text-black">Admin Dashboard</h1>

        <p className="mt-2 text-zinc-600">
          Welcome to Shiv Fashion Admin Panel
        </p>

        {/* Stats */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border bg-white p-6 shadow-lg">
            <p className="text-sm text-zinc-500">Total Products</p>

            <h2 className="mt-3 text-5xl font-bold text-black">
              {totalProducts}
            </h2>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-lg">
            <p className="text-sm text-zinc-500">Total Orders</p>

            <h2 className="mt-3 text-5xl font-bold text-black">
              {totalOrders}
            </h2>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-lg">
            <p className="text-sm text-zinc-500">Pending Orders</p>

            <h2 className="mt-3 text-5xl font-bold text-yellow-500">
              {pendingOrders}
            </h2>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-lg">
            <p className="text-sm text-zinc-500">Delivered Orders</p>

            <h2 className="mt-3 text-5xl font-bold text-green-600">
              {deliveredOrders}
            </h2>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/admin/products"
            className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-zinc-800"
          >
            Manage Products
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-xl border px-6 py-3 font-medium transition hover:bg-zinc-100"
          >
            Manage Orders
          </Link>
        </div>

        {/* Recent Orders */}

        <div className="mt-12">
          <h2 className="mb-5 text-2xl font-bold">Recent Orders</h2>

          <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-100">
                  <th className="p-4 text-left">Customer</th>

                  <th className="p-4 text-left">Product</th>

                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order: any) => (
                  <tr key={order._id} className="border-t hover:bg-zinc-50">
                    <td className="p-4">{order.customerName}</td>

                    <td className="p-4">
                      {order.productId?.name || "Deleted Product"}
                    </td>

                    <td className="p-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
