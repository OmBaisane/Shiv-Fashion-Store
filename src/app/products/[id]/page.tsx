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

  const product = await Product.findById(id).lean();

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <p className="mt-6 text-2xl font-bold">₹{product.price}</p>

          <Link
            href="/order"
            className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-white"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
