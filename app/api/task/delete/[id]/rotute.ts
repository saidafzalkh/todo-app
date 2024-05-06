import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const DELETE = auth(async function DELETE(req, ctx) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  if (!ctx.params)
    return NextResponse.json(
      { message: "Missing parameters" },
      { status: 400 }
    );

  const id = ctx.params.id as string;

  try {
    const task = await prisma.task.delete({ where: { id } });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
