import Link from "next/link";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import DeleteProductButton from "@/components/DeleteProductButton";

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

      <div className="overflow-hidden rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-medium">{product.name}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/edit-product/${product._id}`}
                      className="rounded bg-blue-600 px-3 py-2 text-white"
                    >
                      Edit
                    </Link>

                    <DeleteProductButton productId={product._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
