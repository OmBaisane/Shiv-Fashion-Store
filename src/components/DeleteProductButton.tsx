"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to permanently delete this product?",
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Deleted Successfully");
        router.refresh();
      } else {
        alert("Failed To Delete Product");
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
