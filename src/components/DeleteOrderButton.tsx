"use client";

import { useRouter } from "next/navigation";

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this order?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Order Deleted Successfully");
        router.refresh();
      } else {
        alert("Failed To Delete Order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
    >
      Delete
    </button>
  );
}
