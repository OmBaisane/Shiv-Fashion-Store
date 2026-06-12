import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
};

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data;
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Our Collection</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-xl border shadow"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-72 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>

              <p className="mt-2 text-gray-500">₹{product.price}</p>

              <Link href={`/products/${product._id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
