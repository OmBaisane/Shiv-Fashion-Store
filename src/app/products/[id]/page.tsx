type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
};

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product: Product = await getProduct(id);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <p className="mt-6 text-2xl font-bold">₹{product.price}</p>

          <button className="mt-8 rounded-lg bg-black px-6 py-3 text-white">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
