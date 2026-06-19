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
  }

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />

        <textarea
          rows={5}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />

        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
