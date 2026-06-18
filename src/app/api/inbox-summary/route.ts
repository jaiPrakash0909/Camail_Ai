import { auth } from "@/lib/auth";
import { gmailService } from "@/services/gmail.service";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({
      summary: "Not authenticated",
    });
  }

  const emails = await gmailService.listEmails(
    session.user.id
  );

  const urgent = emails.filter(
    (e) => e.priority === "URGENT"
  ).length;

  const important = emails.filter(
    (e) => e.priority === "IMPORTANT"
  ).length;

  const normal = emails.filter(
    (e) => e.priority === "NORMAL"
  ).length;

  const summary = `
You have ${emails.length} emails.

🔥 Urgent: ${urgent}
⭐ Important: ${important}
📩 Normal: ${normal}

Recent important emails:

${emails
  .filter(
    (e) =>
      e.priority === "URGENT" ||
      e.priority === "IMPORTANT"
  )
  .slice(0, 3)
  .map((e) => `• ${e.subject}`)
  .join("\n")}
`;

  return Response.json({
    summary,
  });
}