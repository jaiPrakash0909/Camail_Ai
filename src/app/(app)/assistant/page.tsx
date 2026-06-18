import { DashboardSidebar } from "@/features/dashboard/dashboard-sidebar";
import { AssistantChat } from "@/features/assistant/assistant-chat";
import { CalendarDays, Mail, Plus } from "lucide-react";
import { ImportantEmails } from "@/features/dashboard/important-emails";

export default function AssistantPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      {/* Main Chat */}
      <AssistantChat />

      {/* Right Sidebar */}

<DashboardSidebar />

    </div>
  );
}






