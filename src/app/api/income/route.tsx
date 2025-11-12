import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/authMiddleware";

import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const user = await requireAuth(req);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const incomes = await prisma.income.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return Response.json(incomes);
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { amount, source } = await req.json();

  const income = await prisma.income.create({
    data: { amount, source, userId: user.id },
  });

  return Response.json(income);
}
