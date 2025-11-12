import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user.id, email: user.email });

  return Response.json({ message: "Login successful", token, user: { id: user.id, email: user.email } });
}
