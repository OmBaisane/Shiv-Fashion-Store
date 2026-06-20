"use client";

import { useRouter } from "next/navigation";

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value;

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    }
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className={`min-w-35 rounded-xl border px-4 py-2 font-semibold shadow-sm transition focus:ring-2 focus:outline-none ${
        currentStatus === "Delivered"
          ? "border-green-300 bg-green-50 text-green-700 focus:ring-green-300"
          : currentStatus === "Confirmed"
            ? "border-blue-300 bg-blue-50 text-blue-700 focus:ring-blue-300"
            : "border-yellow-300 bg-yellow-50 text-yellow-700 focus:ring-yellow-300"
      }`}
    >
      <option value="Pending">🟡 Pending</option>

      <option value="Confirmed">🔵 Confirmed</option>

      <option value="Delivered">🟢 Delivered</option>
    </select>
  );
}
