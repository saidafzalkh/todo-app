"use server";

import { prisma } from "@/prisma/prisma";

export default async function getTasks(filter: "latest" | "deadline") {
  return await prisma.task.findMany({
    orderBy: {
      ...(filter === "latest" ? { created_at: "desc" } : { deadline: "desc" }),
    },
  });
}
