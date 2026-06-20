import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}

      <section className="bg-black">
        <Image
          src="/banner.png"
          alt="Shiv Fashion Banner"
          width={1920}
          height={700}
          priority
          className="w-full object-cover"
        />
      </section>

      {/* Hero Content */}

      <section className="bg-black py-20 text-center text-white">
        <div className="mx-auto max-w-5xl px-6">
          <Image
            src="/logo.png"
            alt="Shiv Fashion"
            width={180}
            height={180}
            className="mx-auto"
            priority
          />

          <h1 className="mt-8 text-5xl font-bold md:text-6xl">
            Elevate Your Style
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
            Premium Men's Wear crafted for confidence, comfort and modern
            fashion.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Shop Now
            </Link>

            <a
              href="https://instagram.com/shivfashion26"
              target="_blank"
              className="rounded-lg border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-black"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Us?</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6 shadow-sm transition hover:shadow-lg">
            <h3 className="text-xl font-bold">Premium Quality</h3>

            <p className="mt-3 text-gray-600">
              Carefully selected men's fashion products.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm transition hover:shadow-lg">
            <h3 className="text-xl font-bold">Affordable Prices</h3>

            <p className="mt-3 text-gray-600">
              Best quality at reasonable pricing.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm transition hover:shadow-lg">
            <h3 className="text-xl font-bold">Fast Surat Delivery</h3>

            <p className="mt-3 text-gray-600">
              Local delivery service available.
            </p>
          </div>
        </div>
      </section>

      {/* Store Address */}

      <section className="bg-zinc-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-zinc-800">Visit Our Store</h2>

          <p className="mt-6 text-lg leading-8 text-zinc-700">
            GYAN VIDYALAYA OPPOSITE
            <br />
            Near Keshar Bhavani Society
            <br />
            Godadara Road
            <br />
            Surat, Gujarat
          </p>
        </div>
      </section>
    </div>
  );
}
