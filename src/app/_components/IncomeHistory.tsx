"use client";

import React from "react";

interface IncomeHistoryProps {
items: { name: string; date: string; amount: number | string }[];
onAddClick: () => void;
}

export default function IncomeHistory({ items, onAddClick }: IncomeHistoryProps) {
const total = items.reduce((sum, item) => sum + parseFloat(item.amount as any || 0), 0);

return (
<div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Income History</h3>
        <button onClick={onAddClick}
            className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition">
            Add Income
        </button>
    </div>

    {/* Total */}
    <div className="mb-4">
        <p className="text-gray-600 text-sm">Total Income</p>
        <p className="text-2xl font-bold text-green-600">${total.toFixed(2)}</p>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
        {items.length > 0 ? (
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Amount</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-gray-800">{item.name || "N/A"}</td>
                    <td className="px-4 py-2 text-gray-600">
                        {new Date(item.date).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold text-green-600">
                        +${parseFloat(item.amount as any || 0).toFixed(2)}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        ) : (
        <p className="text-gray-600 text-center py-6">No income recorded yet</p>
        )}
    </div>
</div>
);
}