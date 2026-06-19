"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        customerName,
        phone,
        address,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      router.push("/success");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-bold">Complete Your Order</h1>
      <p className="mb-8 text-zinc-600">
        Fill your details and we'll contact you shortly.
      </p>

      <div className="rounded-3xl border bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-4 outline-none focus:border-yellow-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-4 outline-none focus:border-yellow-500"
          />

          <textarea
            placeholder="Full Address"
            required
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-4 outline-none focus:border-yellow-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-3 text-white"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
