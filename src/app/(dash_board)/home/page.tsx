"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [income, setIncome] = useState<number>(0);
  const [spending, setSpending] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch("/api/user", { credentials: "include" });
        if (!userRes.ok) throw new Error("Unauthorized");
        const userData = await userRes.json();
        setUser(userData.user);

        const [incomeRes, spendingRes] = await Promise.all([
          fetch(`/api/income`, { credentials: "include" }),
          fetch(`/api/spending`, { credentials: "include" }),
        ]);

        const incomeData = await incomeRes.json();
        const spendingData = await spendingRes.json();

        setIncome(
          incomeData.reduce((sum: number, i: any) => sum + parseFloat(i.amount), 0)
        );
        setSpending(
          spendingData.reduce(
            (sum: number, s: any) => sum + parseFloat(s.amount),
            0
          )
        );
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  if (loading) return <div className="text-center mt-20">Loading dashboard...</div>;
  if (!user) return null;

  const balance = income - spending;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-lg font-medium text-gray-700">
          👤 {user.name}
        </span>
      </div>

      {/* Monthly Balance */}
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-5 mb-8">
        <h2 className="text-gray-600 text-sm mb-2">Balance for this month</h2>
        <p
          className={`text-3xl font-semibold ${
            balance >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${balance.toFixed(2)}
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Income Section */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Income History</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {/* Replace with real income list */}
            <p className="text-gray-600">+ ${income.toFixed(2)} total</p>
          </div>
          <button
            onClick={() => router.push("/income/add")}
            className="mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            + Add Income
          </button>
        </div>

        {/* Spending Section */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Spending History</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {/* Replace with real spending list */}
            <p className="text-gray-600">- ${spending.toFixed(2)} total</p>
          </div>
          <button
            onClick={() => router.push("/spending/add")}
            className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            + Add Spending
          </button>
        </div>
      </div>
    </div>
  );
}
