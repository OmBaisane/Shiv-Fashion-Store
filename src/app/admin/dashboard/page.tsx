import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Link from "next/link";

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
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>

      <p className="mt-2 text-gray-600">Welcome to Shiv Fashion Admin Panel</p>

      {/* Stats */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow">
          <h3 className="text-gray-500">Total Products</h3>

          <p className="mt-2 text-4xl font-bold">{totalProducts}</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <h3 className="text-gray-500">Total Orders</h3>

          <p className="mt-2 text-4xl font-bold">{totalOrders}</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <h3 className="text-gray-500">Pending Orders</h3>

          <p className="mt-2 text-4xl font-bold text-yellow-600">
            {pendingOrders}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <h3 className="text-gray-500">Delivered Orders</h3>

          <p className="mt-2 text-4xl font-bold text-green-600">
            {deliveredOrders}
          </p>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/admin/products"
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Manage Products
        </Link>

        <Link href="/admin/orders" className="rounded-lg border px-5 py-3">
          Manage Orders
        </Link>
      </div>

      {/* Recent Orders */}

      <div className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">Recent Orders</h2>

        <div className="overflow-hidden rounded-xl border bg-white shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Customer</th>

                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order: any) => (
                <tr key={order._id} className="border-t">
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
  );
}
