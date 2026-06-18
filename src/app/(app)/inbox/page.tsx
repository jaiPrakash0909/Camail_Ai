import Link from "next/link";
import { Archive, MailPlus, Star } from "lucide-react";
import { auth } from "@/lib/auth";
import { gmailService } from "@/services/gmail.service";
import { Card } from "@/components/ui/card";
import { PriorityBadge } from "@/features/email/priority-badge";

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    priority?: "URGENT" | "IMPORTANT" | "NORMAL";
  }>;
}) {
  const params = await searchParams;
  const session = await auth();
  const emails = await gmailService.listEmails(session!.user!.id, {
    query: params.q,
    priority: params.priority,
  });

  return (
    <div className="w-full max-w-7xl space-y-4">

<div className="mb-8 flex items-center gap-4">
  <div>
    <h1 className="text-3xl font-bold">
      Smart Inbox
    </h1>

    <p className="mt-1 text-zinc-500">
      AI prioritized emails from Gmail
    </p>
  </div>

  <div className="ml-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm">
    {emails.length} emails
  </div>

  <Link
    href="/assistant?intent=email"
    className="
      ml-auto
      inline-flex
      items-center
      gap-2
      rounded-xl
      bg-[#127173]
      px-4
      py-2
      text-white
      hover:bg-[#0f5c5d]
    "
  >
    <MailPlus className="h-4 w-4" />
    Compose
  </Link>
</div>

      {/* <div className="flex flex-wrap items-center gap-3">



<div className="mb-6 flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold">
      Smart Inbox
    </h1>

    <p className="mt-1 text-zinc-500">
      AI prioritized emails from Gmail
    </p>
  </div>

  <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm">
    {emails.length} emails
  </div>
</div>



     
        <Link
          href="/assistant?intent=email"
          className="
inline-flex
items-center
gap-2
rounded-xl
bg-[#127173]
px-4
py-2
text-white
hover:bg-[#0f5c5d]
"
        >
          <MailPlus className="h-4 w-4" />
          Compose
        </Link>
      </div> */}





      <div className="flex gap-2">
        {["URGENT", "IMPORTANT", "NORMAL"].map((priority) => (
          <Link
            key={priority}
            href={`/inbox?priority=${priority}`}
            className="rounded-full border px-3 py-1 text-sm hover:bg-muted"
          >
            {priority.toLowerCase()}
          </Link>
        ))}
        <Link
          href="/inbox"
          className="rounded-full border px-3 py-1 text-sm hover:bg-muted"
        >
          all
        </Link>
      </div>
      <div className="grid gap-3">
        {emails.map((email) => (
          <Card
            key={email.id}
            className="
      rounded-2xl
      border border-zinc-800
      bg-zinc-950
      p-5
      transition-all
      duration-200
      hover:border-cyan-500/40
      hover:bg-zinc-900
    "
          >
            <Link href={`/email/${email.id}`} className="block">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-base font-semibold text-white">
                      {email.subject}
                    </h3>

                    <PriorityBadge priority={email.priority} />
                  </div>

                  <p className="mt-1 text-xs text-zinc-500">{email.sender}</p>

                  <p
                    className="
              mt-1
    max-w-full
    overflow-hidden
    text-ellipsis
    line-clamp-2
    break-all
    text-sm
    text-zinc-400
            "
                  >
                    {email.body}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs text-zinc-500">
                    {email.createdAt.toLocaleDateString()}
                  </span>

                  {email.starred && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
              </div>
            </Link>
          </Card>
        ))}
        {!emails.length ? (
          <p className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
            No emails found. Connect Gmail through Corsair and sync again.
          </p>
        ) : null}
      </div>
    </div>
  );
}
