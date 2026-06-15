import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}

      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="text-5xl font-bold">Premium Men's Fashion</h1>

          <p className="mt-6 text-lg text-gray-300">
            Quality clothing at affordable prices.
          </p>

          <p className="mt-2 text-gray-400">Delivery Available Only In Surat</p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h3 className="font-bold">Premium Quality</h3>
            <p className="mt-2 text-gray-600">
              Carefully selected men's fashion.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-bold">Cash On Delivery</h3>
            <p className="mt-2 text-gray-600">
              Pay after receiving your order.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-bold">Surat Delivery</h3>
            <p className="mt-2 text-gray-600">
              Fast local delivery across Surat.
            </p>
          </div>
        </div>
      </section>

      {/* Store Address */}

      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold">Visit Our Store</h2>

          <p className="mt-4 text-lg">
            GYAN VIDYALAYA OPPOSITE, NEAR KESHAR BHAVANI SOCIETY, GODADARA ROAD,
            SURAT
          </p>
        </div>
      </section>
    </div>
  );
}
