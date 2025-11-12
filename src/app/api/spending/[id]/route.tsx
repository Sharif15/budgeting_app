import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const { id } = params;
  const { amount, category } = await req.json();

  const updated = await prisma.spending.update({
    where: { id: parseInt(id) },
    data: { amount, category },
  });

  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await prisma.spending.delete({ where: { id: parseInt(id) } });
  return Response.json({ message: "Deleted successfully" });
}
