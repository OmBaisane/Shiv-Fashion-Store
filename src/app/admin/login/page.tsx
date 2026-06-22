"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/admin/dashboard";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-10 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-zinc-900">Shiv Fashion</h1>

          <p className="mt-2 text-zinc-500">Admin Dashboard Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-zinc-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-zinc-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black transition outline-none focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:bg-zinc-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
