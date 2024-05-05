"use server";

import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function createTask(data: Prisma.TaskCreateInput) {
  try {
    await prisma.task.create({ data });
  } catch (error) {
    return { error };
  }
  revalidatePath("/dashboard");
}
