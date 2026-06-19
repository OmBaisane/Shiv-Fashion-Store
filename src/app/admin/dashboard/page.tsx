import Link from "next/link";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import AdminNavbar from "@/components/AdminNavbar";
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
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl p-6">
        <AdminNavbar />

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Products</h1>

            <p className="mt-2 text-zinc-600">Manage your store products</p>
          </div>

          <Link
            href="/admin/products/add-product"
            className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-zinc-800"
          >
            Add Product
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-100">
                <th className="p-4 text-left">Image</th>

                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Price</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product: any) => (
                <tr key={product._id} className="border-t hover:bg-zinc-50">
                  <td className="p-4">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">{product.name}</td>

                  <td className="p-4 font-semibold">₹{product.price}</td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/edit-product/${product._id}`}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
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
    </div>
  );
}
