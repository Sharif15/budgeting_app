import { jwtVerify } from "jose";

import { NextRequest, NextResponse } from "next/server";


export async function requireAuth(req: NextRequest) {
  const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("Auth error:", err);
    return null;
  }
}
