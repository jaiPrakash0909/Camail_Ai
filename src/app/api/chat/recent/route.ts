import { auth } from "@/lib/auth";
import { chatRepository } from "@/repositories/chat.repository";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json([]);
  }

  const chats = await chatRepository.recent(
    session.user.id
  );

  return Response.json(chats);
}