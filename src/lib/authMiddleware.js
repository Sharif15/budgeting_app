import { requireAuth } from "@/lib/auth";

export async function requireAuth(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  const decoded = verifyToken(token);
  return decoded; // { id, email }
}
