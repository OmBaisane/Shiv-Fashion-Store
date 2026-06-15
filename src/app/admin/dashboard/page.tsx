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
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id} className="border-b">
                <td className="p-4">{order.customerName}</td>

                <td className="p-4">{order.phone}</td>

                <td className="p-4">{order.productId?.name}</td>

                <td className="p-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
