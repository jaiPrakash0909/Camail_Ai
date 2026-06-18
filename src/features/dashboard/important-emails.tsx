"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

export function ImportantEmails() {
  const [emails, setEmails] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setEmails);
  }, []);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5 text-cyan-500" />
        <h3 className="font-semibold">
          Important Emails
        </h3>
      </div>

      <div className="space-y-3">
        {(emails?.length ?? 0) === 0 ? (
          <p className="text-sm text-zinc-500">
            No important emails
          </p>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className="rounded-xl bg-zinc-900 p-3"
            >
              <p className="text-sm font-medium">
                {email.subject}
              </p>

              <p className="text-xs text-zinc-500">
                {email.priority}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}