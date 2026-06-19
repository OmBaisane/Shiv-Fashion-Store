import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}

      <section className="relative bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <Image
            src="/logo.png"
            alt="Shiv Fashion"
            width={220}
            height={220}
            className="mx-auto"
            priority
          />

          <h1 className="mt-8 text-6xl font-bold">Elevate Your Style</h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
            Premium Men's Wear crafted for confidence, comfort and modern
            fashion.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/products"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-black"
            >
              Shop Now
            </Link>

            <a
              href="https://instagram.com/shivfashion26"
              target="_blank"
              className="rounded-lg border border-white px-6 py-3"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">Why Choose Us?</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="font-bold">Premium Quality</h3>

            <p className="mt-2 text-gray-600">
              Carefully selected men's fashion products.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="font-bold">Affordable Prices</h3>

            <p className="mt-2 text-gray-600">
              Best quality at reasonable pricing.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="font-bold">Fast Surat Delivery</h3>

            <p className="mt-2 text-gray-600">
              Local delivery service available.
            </p>
          </div>
        </div>
      </section>

      {/* Address */}

      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold">Visit Our Store</h2>

          <p className="mt-6 text-lg">
            GYAN VIDYALAYA OPPOSITE,
            <br />
            Near Keshar Bhavani Society,
            <br />
            Godadara Road,
            <br />
            Surat
          </p>
        </div>
      </section>
    </div>
  );
}
