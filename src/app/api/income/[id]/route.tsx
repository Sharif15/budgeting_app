import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const { id } = params;
  const { amount, source } = await req.json();

  const updated = await prisma.income.update({
    where: { id: parseInt(id) },
    data: { amount, source },
  });

  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await prisma.income.delete({ where: { id: parseInt(id) } });
  return Response.json({ message: "Deleted successfully" });
}
