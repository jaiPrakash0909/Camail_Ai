import { auth } from "@/lib/auth";
import { dashboardRepository } from "@/repositories/dashboard.repository";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({
      emails: [],
      events: []
    });
  }

  const [emails, events] = await Promise.all([
    dashboardRepository.importantEmails(
      session.user.id
    ),
    dashboardRepository.todayEvents(
      session.user.id
    )
  ]);

  return Response.json({
    emails,
    events
  });
}