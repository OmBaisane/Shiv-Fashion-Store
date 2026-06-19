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
    <div className="mx-auto max-w-7xl p-6">
      <AdminNavbar />
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>

        <p className="mt-2 text-gray-600">Manage customer orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">No Orders Yet</div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Customer</th>

                <th className="p-4 text-left">Phone</th>

                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order: any) => (
                <tr key={order._id} className="border-t">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{order.customerName}</p>

                      <p className="text-sm text-gray-500">{order.address}</p>
                    </div>
                  </td>

                  <td className="p-4">{order.phone}</td>

                  <td className="p-4">
                    {order.productId?.name || "Deleted Product"}
                  </td>

                  <td className="p-4">
                    <OrderStatusSelect
                      orderId={order._id}
                      currentStatus={order.status}
                    />
                  </td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
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
