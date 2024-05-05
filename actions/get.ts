"use server";

import { prismaClient } from "@/prisma/prisma";

export default async function getTasks() {
  return await prismaClient.task.findMany();
}
