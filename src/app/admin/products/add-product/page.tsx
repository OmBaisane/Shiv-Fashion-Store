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
      } else {
        alert(data.message || "Failed to create product");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Product Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <textarea
          placeholder="Description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <div className="space-y-3">
          <label className="font-medium">Product Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full rounded-lg border p-3"
          />

          {uploading && <p className="text-blue-600">Uploading Image...</p>}

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="h-56 w-full rounded-lg border object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
