import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div>
          <h2 className="text-xl font-bold text-black">Shiv Fashion Admin</h2>

          <p className="text-sm text-zinc-500">Store Management Panel</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/dashboard"
            className="rounded-xl bg-black px-5 py-2.5 font-medium text-white transition hover:bg-zinc-800"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="rounded-xl border border-zinc-300 px-5 py-2.5 font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-xl border border-zinc-300 px-5 py-2.5 font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
