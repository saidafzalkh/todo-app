import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const PATCH = auth(async function PATCH(req, ctx) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  if (!ctx.params)
    return NextResponse.json({ message: "Missing parameter" }, { status: 400 });

  const id = ctx.params.id as string;
  const data: Prisma.TaskUpdateInput = await req.json();
  const task = await prisma.task.update({ where: { id }, data });

  return NextResponse.json(task);
});
