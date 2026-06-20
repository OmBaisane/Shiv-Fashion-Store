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
    return <div className="p-10 text-center">Product Not Found</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Image */}

        <div>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-150 w-full rounded-3xl object-cover shadow-2xl"
          />
        </div>

        {/* Details */}

        <div>
          <h1 className="text-5xl font-bold text-black">{product.name}</h1>

          <p className="mt-6 text-4xl font-bold text-yellow-600">
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

          <p className="mt-8 leading-7 text-gray-600">{product.description}</p>

          <div className="mt-10 flex gap-4">
            <Link
              href={`/order?productId=${product._id}`}
              className="rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-zinc-800"
            >
              Order Now
            </Link>

            <Link href="/products" className="rounded-lg border px-6 py-3">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
