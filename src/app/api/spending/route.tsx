import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId"));

  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });

  const spendings = await prisma.spending.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  return Response.json(spendings);
}

export async function POST(req) {
  const { amount, category, userId } = await req.json();

  const spending = await prisma.spending.create({
    data: { amount, category, userId },
  });

  return Response.json(spending);
}
