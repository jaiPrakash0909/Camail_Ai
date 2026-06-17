import { AssistantChat } from "@/features/assistant/assistant-chat";
import { CalendarDays, Mail, Plus } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      {/* Main Chat */}
      <AssistantChat />

      {/* Right Sidebar */}
      <aside className="sticky top-24 h-fit space-y-4">
        {/* Today Schedule */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition-all
duration-300
hover:border-cyan-500/50
hover:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-cyan-500" />
            <h3 className="font-semibold">
              Today's Schedule
            </h3>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl bg-zinc-900 p-3">
              <p className="text-sm font-medium">
                Rahul Meeting
              </p>
              <p className="text-xs text-zinc-500">
                3:00 PM
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-3">
              <p className="text-sm font-medium">
                Client Call
              </p>
              <p className="text-xs text-zinc-500">
                5:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Important Emails */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition-all
duration-300
hover:border-cyan-500/50
hover:bg-zinc-900">
          <div className="mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5 text-cyan-500" />
            <h3 className="font-semibold">
              Important Emails
            </h3>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl bg-zinc-900 p-3">
              <p className="text-sm font-medium">
                Contract Review
              </p>

              <p className="text-xs text-zinc-500">
                Action Required
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-3">
              <p className="text-sm font-medium">
                Payment Confirmation
              </p>

              <p className="text-xs text-zinc-500">
                High Priority
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition-all
duration-300
hover:border-cyan-500/50
hover:bg-zinc-900">
          <h3 className="mb-4 font-semibold">
            Quick Actions
          </h3>

          <div className="space-y-2">
            <button className="flex w-full items-center gap-2 rounded-xl bg-zinc-900 p-3 text-left hover:bg-zinc-800">
              <Plus className="h-4 w-4" />
              Create Event
            </button>

            <button className="flex w-full items-center gap-2 rounded-xl bg-zinc-900 p-3 text-left hover:bg-zinc-800">
              <Mail className="h-4 w-4" />
              Compose Email
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}


















