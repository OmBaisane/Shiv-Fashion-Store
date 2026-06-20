"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
};

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      const { id } = await params;

      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      if (data.success) {
        const p = data.data;

        setProduct(p);
        setName(p.name);
        setDescription(p.description);
        setPrice(String(p.price));
        setImageUrl(p.images?.[0] || "");
      }

      setLoading(false);
    }

    loadProduct();
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!product) return;

    try {
      setUpdating(true);

      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          images: [imageUrl],
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Updated Successfully");
        router.push("/admin/products");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Product...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black">Edit Product</h1>

          <p className="mt-2 text-zinc-600">
            Update product details and preview changes.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-zinc-800">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none focus:border-black focus:ring-2 focus:ring-zinc-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-800">
                Description
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none focus:border-black focus:ring-2 focus:ring-zinc-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-800">
                Price (₹)
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none focus:border-black focus:ring-2 focus:ring-zinc-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-800">
                Image URL
              </label>

              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none focus:border-black focus:ring-2 focus:ring-zinc-200"
              />
            </div>

            {imageUrl && (
              <div>
                <p className="mb-3 font-semibold text-zinc-800">
                  Image Preview
                </p>

                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-80 w-full rounded-2xl border border-zinc-200 object-cover shadow"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={updating}
              className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-zinc-800"
            >
              {updating ? "Updating Product..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
