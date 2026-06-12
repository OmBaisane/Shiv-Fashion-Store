"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    router.push("/order-success");
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Place Your Order</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full rounded border p-3"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="tel"
          placeholder="Phone Number"
          required
          className="w-full rounded border p-3"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Address"
          required
          className="w-full rounded border p-3"
          rows={4}
          value={formData.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              address: e.target.value,
            })
          }
        />

        <div className="rounded border bg-gray-50 p-4">
          <p>
            Payment Method:
            <strong> Cash On Delivery</strong>
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Delivery Available Only In Surat
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-black py-3 text-white"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
