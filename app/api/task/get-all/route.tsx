import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const searchParams = req.nextUrl.searchParams;
  const filter = searchParams.get("filter");

  if (!filter) {
    return NextResponse.json(
      { message: "Invalid filter parameter" },
      { status: 400 }
    );
  }

  const isLatest = filter === "latest";

  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.auth.user?.id },
      orderBy: { ...(isLatest ? { created_at: "desc" } : { deadline: "asc" }) },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
