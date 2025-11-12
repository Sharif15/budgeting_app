import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest) {
  const { email, password } = await req.json();

  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: { email, password: hashedPassword },
  });

  return NextResponse.json(user);
}
