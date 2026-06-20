import Link from "next/link";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const product = JSON.parse(JSON.stringify(await Product.findById(id)));

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <p className="mt-2 text-zinc-500">
            This product may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Image */}

        <div>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-125 w-full rounded-3xl border border-zinc-200 object-cover shadow-2xl"
          />
        </div>

        {/* Details */}

        <div>
          <h1 className="text-4xl font-bold text-black md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-6 text-5xl font-bold text-yellow-500">
            ₹{product.price}
          </p>

          <div className="mt-6 flex gap-3">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Cash On Delivery
            </span>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Surat Delivery
            </span>
          </div>

          <div className="mt-8 border-t border-zinc-200"></div>

          <p className="mt-8 text-lg leading-8 text-zinc-600">
            {product.description}
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href={`/order?productId=${product._id}`}
              className="rounded-xl bg-black px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-zinc-800"
            >
              Order Now
            </Link>

            <Link
              href="/products"
              className="rounded-xl border border-zinc-300 px-6 py-4 font-medium transition hover:bg-zinc-100"
            >
              Back
            </Link>
          </div>
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <h3 className="font-semibold text-black">
              Why Buy Form Shiv Fashion?
            </h3>

            <ul className="mt-3 space-y-2 text-zinc-600">
              <li>Premium Quality Products</li>
              <li>Affordable Pricing</li>
              <li>Fast Delivery In Surat</li>
              <li>Cash On Delivery Available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
