"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Mail } from "lucide-react";

export function DashboardSidebar() {
  const [data, setData] = useState<any>({
    emails: [],
    events: [],
  });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <div className="sticky top-24 space-y-4">
      {/* Schedule */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-cyan-500" />
          <h3 className="font-semibold">
            Today's Schedule
          </h3>
        </div>

        <div className="space-y-3">
          {data.events.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No events today
            </p>
          ) : (
            data.events.map((event: any) => (
              <div
                key={event.id}
                className="rounded-xl bg-zinc-900 p-3"
              >
                <p className="text-sm font-medium">
                  {event.title}
                </p>

                <p className="text-xs text-zinc-500">
                  {new Date(
                    event.startTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Emails */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Mail className="h-5 w-5 text-cyan-500" />
          <h3 className="font-semibold">
            Important Emails
          </h3>
        </div>

        <div className="space-y-3">
          {data.emails.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No important emails
            </p>
          ) : (
            data.emails.map((email: any) => (
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
    </div>
  );
}