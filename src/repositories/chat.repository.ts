import { prisma } from "@/lib/prisma";

export const chatRepository = {
  async recent(userId: string) {
    const chats = await prisma.commandHistory.findMany({
  where: { userId },
  orderBy: { createdAt: "desc" },
  take: 30,
});

return chats.filter(
  (chat, index, self) =>
    index ===
    self.findIndex(
      (c) => c.prompt === chat.prompt
    )
);
  },
};