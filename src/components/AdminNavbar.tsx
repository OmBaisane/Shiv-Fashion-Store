import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="mb-8 flex flex-wrap gap-3 border-b pb-4">
      <Link
        href="/admin/dashboard"
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Dashboard
      </Link>

      <Link href="/admin/products" className="rounded-lg border px-4 py-2">
        Products
      </Link>

      <Link href="/admin/orders" className="rounded-lg border px-4 py-2">
        Orders
      </Link>
    </div>
  );
}
