import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";
import AdminNavbar from "@/components/AdminNavbar";
import OrderStatusSelect from "@/components/OrderStatusSelect";

export default async function AdminOrdersPage() {
  await connectDB();

  const orders = JSON.parse(
    JSON.stringify(
      await Order.find().populate("productId").sort({ createdAt: -1 }),
    ),
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl p-6">
        <AdminNavbar />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900">
            Orders Management
          </h1>

          <p className="mt-2 text-zinc-600">
            Manage customer orders and delivery status
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-zinc-800">No Orders Yet</h2>

            <p className="mt-2 text-zinc-500">
              Customer orders will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-100">
                  <th className="p-5 text-left">Customer</th>
                  <th className="p-5 text-left">Phone</th>
                  <th className="p-5 text-left">Product</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order: any) => (
                  <tr
                    key={order._id}
                    className="border-t transition hover:bg-zinc-50"
                  >
                    <td className="p-5">
                      <div>
                        <p className="font-semibold text-zinc-900">
                          {order.customerName}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          {order.address}
                        </p>
                      </div>
                    </td>

                    <td className="p-5 font-medium">{order.phone}</td>

                    <td className="p-5">
                      {order.productId?.name || "Deleted Product"}
                    </td>

                    <td className="p-5">
                      <OrderStatusSelect
                        orderId={order._id}
                        currentStatus={order.status}
                      />
                    </td>

                    <td className="p-5 text-zinc-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
