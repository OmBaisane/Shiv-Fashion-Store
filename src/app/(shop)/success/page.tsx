import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mb-6 text-7xl">🎉</div>

        <h1 className="text-5xl font-bold text-white">
          Order Placed Successfully
        </h1>

        <p className="mt-5 text-lg text-zinc-600">
          Thank you for shopping with Shiv Fashion. Our team will contact you
          shortly to confirm your order.
        </p>

        <div className="mt-8 rounded-2xl bg-zinc-50 p-5">
          <p className="text-zinc-700">Delivery Available Only In Surat</p>
        </div>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-zinc-800"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
