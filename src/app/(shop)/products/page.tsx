import Link from "next/link";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export default async function ProductsPage() {
  await connectDB();

  const products = JSON.parse(
    JSON.stringify(await Product.find().sort({ createdAt: -1 })),
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Heading */}

      <div className="mb-14 text-center">
        <h1 className="text-4xl font-bold text-black md:text-6xl">
          Our Collection
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Premium quality clothing at affordable prices.
        </p>
      </div>

      {/* Empty State */}

      {products.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-2xl font-semibold">No Products Available</h2>

          <p className="mt-2 text-gray-500">Products will be added soon.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Product Image */}

              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Product Info */}

              <div className="p-5">
                <h2 className="text-2xl font-bold text-zinc-900">
                  {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>

                <p className="mt-4 text-3xl font-bold text-yellow-500">
                  ₹{product.price}
                </p>

                <Link
                  href={`/products/${product._id}`}
                  className="mt-6 inline-block w-full rounded-xl bg-black px-4 py-3 text-center font-semibold text-white transition hover:bg-gray-800"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
