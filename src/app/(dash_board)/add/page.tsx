"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddTransaction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeFromQuery = searchParams.get("type") as "income" | "spending";

  const [type, setType] = useState<"income" | "spending">(typeFromQuery || "income");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeFromQuery) setType(typeFromQuery);
  }, [typeFromQuery]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const payload: any = { name, amount: parseFloat(amount), date };
    if (type === "spending") payload.category_id = categoryId;

    try {
      const res = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Add {type === "income" ? "Income" : "Spending"}</h1>

        {/* Type Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "spending")}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="spending">Spending</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {type === "spending" && (
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={categoryId || ""}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value={1}>Food</option>
                <option value={2}>Transport</option>
                <option value={3}>Bills</option>
              </select>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add {type === "income" ? "Income" : "Spending"}
          </button>
        </form>
      </div>
    </div>
  );
}
