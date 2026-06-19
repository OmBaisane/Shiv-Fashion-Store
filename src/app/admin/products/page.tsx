import Link from "next/link";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export default async function AdminProductsPage() {
  await connectDB();

  const products = JSON.parse(
    JSON.stringify(
      await Product.find().sort({
        createdAt: -1,
      }),
    ),
  );

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        <Link
          href="/admin/products/add-product"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">{product.name}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="flex gap-3 p-4">
                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    className="rounded bg-blue-500 px-3 py-1 text-white"
                  >
                    Edit
                  </Link>

                  <button className="rounded bg-red-500 px-3 py-1 text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
