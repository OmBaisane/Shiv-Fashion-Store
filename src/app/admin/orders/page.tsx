import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";
import AdminNavbar from "@/components/AdminNavbar";
import OrderStatusSelect from "@/components/OrderStatusSelect";
import DeleteOrderButton from "@/components/DeleteOrderButton";

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
          <div className="overflow-x-auto rounded-3xl bg-white shadow-xl">
            <table className="w-full min-w-225">
              <thead>
                <tr className="bg-zinc-100">
                  <th className="p-5 text-left">Customer</th>
                  <th className="p-5 text-left">Phone</th>
                  <th className="p-5 text-left">Product</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-left">Date</th>
                  <th className="p-5 text-left">Actions</th>
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

                    <td className="p-5">
                      {order.status === "Delivered" && (
                        <DeleteOrderButton orderId={order._id} />
                      )}
                    </td>

                    <td className="p-5">
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`https://wa.me/91${order.phone}`}
                          target="_blank"
                          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                        >
                          WhatsApp
                        </a>

                        <a
                          href={`tel:${order.phone}`}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          Call
                        </a>
                      </div>
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
