import Link from "next/link";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find().lean();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Our Collection</h1>

      <div
        key={product._id}
        className="overflow-hidden rounded-xl border bg-white shadow transition hover:shadow-lg"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-72 w-full object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>

          <p className="mt-2 text-2xl font-bold">₹{product.price}</p>

          <Link
            href={`/products/${product._id}`}
            className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
