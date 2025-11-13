"use client";

import React from "react";

interface DashboardItemProps {
  item: {
    id: number;
    name: string;
    amount: number | string; // Decimal from Prisma
    date: string;
  };
  type: "income" | "spending";
}

export default function DashboardItem({ item, type }: DashboardItemProps) {
  const amount = Number(item.amount) || 0; // Convert Decimal to number
  const color = type === "income" ? "green" : "red";

  return (
    <li className="flex justify-between py-2 border-b hover:bg-gray-50 transition px-4">
      <span>{item.name}</span>
      <span className={`font-semibold text-${color}-600`}>
        {type === "spending" ? "-" : "+"}${amount.toFixed(2)}
      </span>
    </li>
  );
}
