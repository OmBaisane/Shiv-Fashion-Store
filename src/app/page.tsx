import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Premium Fashion For Everyone</h1>

      <p>Trendy clothing with Cash On Delivery.</p>

      <Link href="/products">Shop Now</Link>
    </main>
  );
}
