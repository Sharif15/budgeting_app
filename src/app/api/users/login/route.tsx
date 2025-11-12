import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return Response.json({ message: "Login successful", user });
}
