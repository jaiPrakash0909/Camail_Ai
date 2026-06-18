import { prisma } from "@/lib/prisma";

export const dashboardRepository = {
  importantEmails(userId: string) {
    return prisma.email.findMany({
      where: {
        userId,
        archived: false,
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

  todayEvents(userId: string) {
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