import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold">Order Placed Successfully 🎉</h1>

      <p className="mt-4 text-gray-600">We will contact you soon.</p>

      <Link
        href="/products"
        className="mt-8 rounded-lg bg-black px-6 py-3 text-white"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
