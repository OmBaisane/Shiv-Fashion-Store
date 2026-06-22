"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.url);
      } else {
        alert("Upload Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/products", {
        method: "POST",

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
        router.push("/admin/products");
        alert("Product Created Successfully");
      } else {
        alert("Failed To Create Product");
      }
    } catch (error) {
      console.error(error);
      alert("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black">Add New Product</h1>

          <p className="mt-2 text-zinc-600">
            Create a new product for Shiv Fashion store.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none placeholder:text-zinc-400 focus:border-black focus:ring-2 focus:ring-zinc-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Enter product description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none placeholder:text-zinc-400 focus:border-black focus:ring-2 focus:ring-zinc-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Price (₹)
              </label>

              <input
                type="number"
                placeholder="Enter product price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none placeholder:text-zinc-400 focus:border-black focus:ring-2 focus:ring-zinc-200"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-zinc-700">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full rounded-xl border border-zinc-300 p-3 text-zinc-400"
              />

              {uploading && (
                <p className="mt-3 font-medium text-blue-600">
                  Uploading Image...
                </p>
              )}

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="mt-4 h-72 w-full rounded-2xl border border-zinc-200 object-cover shadow"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800"
            >
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
