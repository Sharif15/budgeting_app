import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId"));

  if (!userId) return Response.json({ error: "userId required" }, { status: 400 });

  const incomes = await prisma.income.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  return Response.json(incomes);
}

export async function POST(req) {
  const { amount, source, userId } = await req.json();

  const income = await prisma.income.create({
    data: { amount, source, userId },
  });

  return Response.json(income);
}
