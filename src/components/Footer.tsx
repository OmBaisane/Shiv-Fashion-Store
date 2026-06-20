export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}

          <div>
            <h3 className="text-3xl font-bold text-yellow-400">Shiv Fashion</h3>

            <p className="mt-4 text-zinc-300">
              Premium Men's Wear crafted for confidence, comfort and modern
              fashion.
            </p>
          </div>

          {/* Delivery */}

          <div>
            <h4 className="mb-3 text-lg font-semibold text-white">Delivery</h4>

            <p className="text-zinc-300">Delivery Available Only In Surat</p>

            <p className="mt-2 text-zinc-400">
              Fast local delivery service for all orders.
            </p>
          </div>

          {/* Address */}

          <div>
            <h4 className="mb-3 text-lg font-semibold text-white">
              Store Address
            </h4>

            <p className="leading-7 text-zinc-300">
              GYAN VIDYALAYA OPPOSITE,
              <br />
              Near Keshar Bhavani Society,
              <br />
              Godadara Road,
              <br />
              Surat
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6">
          <p className="text-center text-sm text-zinc-500">
            © 2026 Shiv Fashion. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
