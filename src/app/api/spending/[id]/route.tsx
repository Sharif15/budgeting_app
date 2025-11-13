import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";


export async function PUT(req : NextRequest, { params } : { params: { id: string } }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const { amount, category } = await req.json();

  const updated = await prisma.spending.updateMany({
    where: { id: parseInt(id), userId: user.id },
    data: { amount, category },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req : NextRequest, { params } : { params: { id: string } }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  await prisma.spending.deleteMany({
    where: { id: parseInt(id), userId: user.id },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}
