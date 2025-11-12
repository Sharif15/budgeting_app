import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: { email, password: hashedPassword },
  });

  return Response.json(user);
}
