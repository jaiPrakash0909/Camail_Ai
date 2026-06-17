import { prisma } from "@/lib/prisma";

export const chatRepository = {
  async recent(userId: string) {
    return prisma.commandHistory.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  },
};