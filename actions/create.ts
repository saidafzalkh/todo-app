"use server";

import { prismaClient } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";

export default async function createTask(data: Prisma.TaskCreateInput) {
  prismaClient.task.create({ data });
}
