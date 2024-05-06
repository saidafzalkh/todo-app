import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const data: Prisma.TaskCreateInput = await req.json();

  const task = await prisma.task.create({ data });
  return NextResponse.json(task, { status: 200 });
});
