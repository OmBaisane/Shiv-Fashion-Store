import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function AdminDashboardPage() {
  await connectDB();

  const orders = JSON.parse(
    JSON.stringify(
      await Order.find().populate("productId").sort({ createdAt: -1 }),
    ),
  );

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>

      <p className="mb-8 text-gray-600">Shiv Fashion Admin Panel</p>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{order.customerName}</td>

                  <td className="p-4">{order.phone}</td>

                  <td className="p-4">
                    {order.productId?.name || "Product Deleted"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
