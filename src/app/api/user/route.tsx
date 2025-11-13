import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Fetch user from database
    const user = await prisma.users.findUnique({ where: { user_id: payload.userId } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    return NextResponse.json({
      user: { id: user.user_id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
