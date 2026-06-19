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
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="rounded border p-2"
    >
      <option value="Pending">Pending</option>

      <option value="Confirmed">Confirmed</option>

      <option value="Delivered">Delivered</option>
    </select>
  );
}
