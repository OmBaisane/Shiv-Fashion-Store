import Link from "next/link";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export default async function ProductsPage() {
  await connectDB();

  const products = JSON.parse(
    JSON.stringify(await Product.find().sort({ createdAt: -1 })),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Heading */}

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Our Collection</h1>

        <p className="mt-3 text-gray-600">
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-xl border bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Product Image */}

              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-80 w-full object-cover"
              />

              {/* Product Info */}

              <div className="p-5">
                <h2 className="text-xl font-semibold">{product.name}</h2>

                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>

                <p className="mt-4 text-2xl font-bold text-black">
                  ₹{product.price}
                </p>

                <Link
                  href={`/products/${product._id}`}
                  className="mt-5 inline-block w-full rounded-lg bg-black px-4 py-3 text-center font-medium text-white transition hover:bg-gray-800"
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
