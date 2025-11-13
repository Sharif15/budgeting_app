"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IncomeHistory from "../../_components/IncomeHistory"; // adjust path if needed

export default function IncomePage() {
  const router = useRouter();
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIncome() {
      try {
        const res = await fetch("/api/income", { credentials: "include" });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setIncomeData(data);
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchIncome();
  }, [router]);

  if (loading) return <div className="text-center mt-20">Loading income...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <IncomeHistory 
          items={incomeData} 
          onAddClick={() => router.push("/income/add")} 
        />

        <button
          onClick={() => router.push("/home")}
          className="mt-6 text-blue-600 hover:text-blue-800 transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
