import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const spendings = await prisma.spending.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(spendings);
}

export async function POST(req : NextRequest) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { amount, category } = await req.json();

  const spending = await prisma.spending.create({
    data: { amount, category, userId: user.id },
  });

  return NextResponse.json(spending);
}
