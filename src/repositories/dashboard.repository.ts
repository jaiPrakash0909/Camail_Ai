import { prisma } from "@/lib/prisma";

export const dashboardRepository = {
  async importantEmails(userId: string) {
    return prisma.email.findMany({
      where: {
        userId,
        OR: [
          { priority: "URGENT" },
          { priority: "IMPORTANT" }
        ]
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 5
    });
  },

  async todayEvents(userId: string) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return prisma.event.findMany({
      where: {
        userId,
        startTime: {
          gte: start,
          lte: end
        }
      },
      orderBy: {
        startTime: "asc"
      },
      take: 5
    });
  }
};