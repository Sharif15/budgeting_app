"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IncomeHistory from "../../_components/IncomeHistory";
import SpendingHistory from "../../_components/SpendingHistory";

interface User {
  user_id: number;
  name: string;
  email: string;
}

interface Item {
  id: number;
  name: string;
  amount: number | string;
  date: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [incomeData, setIncomeData] = useState<Item[]>([]);
  const [spendingData, setSpendingData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user info
        const userRes = await fetch("/api/user", { credentials: "include" });
        if (!userRes.ok) throw new Error("Unauthorized");
        const userJson = await userRes.json();
        setUser(userJson.user);

        // Fetch income & spending
        const [incomeRes, spendingRes] = await Promise.all([
          fetch("/api/income", { credentials: "include" }),
          fetch("/api/spending", { credentials: "include" }),
        ]);

        if (!incomeRes.ok || !spendingRes.ok) throw new Error("Failed to fetch data");

        const [incomeJson, spendingJson] = await Promise.all([incomeRes.json(), spendingRes.json()]);
        setIncomeData(incomeJson);
        setSpendingData(spendingJson);
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

  const totalIncome = incomeData.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalSpending = spendingData.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const balance = totalIncome - totalSpending;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-6 max-w-4xl">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-lg font-medium text-gray-700">👤 {user.name}</span>
      </div>

      {/* Monthly Balance */}
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-5 mb-8">
        <h2 className="text-gray-600 text-sm mb-2">Balance for this month</h2>
        <p className={`text-3xl font-semibold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
          ${balance.toFixed(2)}
        </p>
      </div>

      {/* Income & Spending Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <IncomeHistory items={incomeData} onAddClick={() => router.push("/add?type=income")} />
        <SpendingHistory items={spendingData} onAddClick={() => router.push("/add?type=spending")} />
      </div>
    </div>
  );
}
