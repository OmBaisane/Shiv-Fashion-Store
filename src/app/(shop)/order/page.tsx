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
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <h1 className="mb-2 text-4xl font-bold text-black md:text-5xl">
        Complete Your Order
      </h1>
      <p className="mb-8 text-lg text-zinc-600">
        Fill your details and we'll contact you shortly.
      </p>

      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="mb-2 block font-semibold text-zinc-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-4 text-black outline-none focus:border-yellow-500"
          />

          <label className="mb-2 block font-semibold text-zinc-700">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-4 text-black outline-none focus:border-yellow-500"
          />

          <label className="mb-2 block font-semibold text-zinc-700">
            Delivery Address
          </label>
          <textarea
            placeholder="Full Address"
            required
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-4 text-black outline-none focus:border-yellow-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-zinc-800"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
        <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
          <h3 className="font-semibold">Order Information</h3>

          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li>Cash On Delivery Available</li>
            <li>Delivery Only In Surat</li>
            <li>Fast Customer Support</li>
            <li>Premium Quality Products</li>
          </ul>
        </div>
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
