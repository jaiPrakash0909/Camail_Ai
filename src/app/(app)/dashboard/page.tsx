import { CalendarClock, Inbox, MailWarning, Star } from "lucide-react";
import { AiCommandCenter } from "@/features/dashboard/ai-command-center";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { emailRepository } from "@/repositories/email.repository";
import { eventRepository } from "@/repositories/event.repository";
import { commandRepository } from "@/repositories/command.repository";
// new
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  // const userId = session!.user!.id;
  const [[totalEmails, urgentEmails, importantEmails], todaysMeetings, upcomingEvents, history] = await Promise.all([
    emailRepository.counts(userId),
    eventRepository.todaysCount(userId),
    eventRepository.upcoming(userId),
    commandRepository.recent(userId, 6)
  ]);

  const stats = [
    { label: "Total Emails", value: totalEmails, icon: Inbox },
    { label: "Urgent Emails", value: urgentEmails, icon: MailWarning },
    { label: "Important Emails", value: importantEmails, icon: Star },
    { label: "Today's Meetings", value: todaysMeetings, icon: CalendarClock }
  ];

  return (
    <div className="space-y-6">



      {/* // change  */}
<Card className="rounded-3xl border-zinc-800 bg-zinc-950/70">
  <CardContent className="p-8">
    <h1 className="text-4xl font-bold">
      Welcome back 👋
    </h1>

    <p className="mt-2 text-zinc-400">
      Manage your inbox, meetings and AI workflows from one place.
    </p>
  </CardContent>
</Card>
      {/* // change  */}


      <AiCommandCenter />
      {/* //old */}
      {/* <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> */}
{/* //new */}
<section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
  
        {stats.map((stat) => (

          //old
          // <Card key={stat.label}>


          // new
          <Card
  key={stat.label}
  className="
    rounded-3xl
    border-zinc-800
    bg-zinc-950/70
    backdrop-blur
  "
>

            <CardHeader className="flex flex-row items-center justify-between pb-2">
              {/* //old */}
              {/* <CardTitle className="text-sm text-muted-foreground">{stat.label}</CardTitle> */}
              {/* //new */}
              <CardTitle className="text-xs uppercase tracking-wider text-zinc-500">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>


{/* // old */}
              {/* <div className="text-3xl font-semibold">{stat.value}</div> */}
              {/* //new */}
              <div className="text-4xl font-bold">{stat.value}</div>

            </CardContent>
          </Card>
        ))}
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {/* //old */}
        {/* <Card> */}
          {/* //new */}
          <Card className="rounded-3xl border-zinc-800 bg-zinc-950/70">
          <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.length ? upcomingEvents.map((event) => (
              //old
              // <div key={event.id} className="rounded-md border p-3">
              //new
              <div key={event.id} className=" rounded-2xl border border-zinc-800 bg-black/40 p-4 ">
                // *
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-muted-foreground">{event.startTime.toLocaleString()}</div>
              </div>
            )) : <p className="text-sm text-muted-foreground">No upcoming events synced yet.</p>}
          </CardContent>
        </Card>
        {/* //old */}
        {/* <Card> */}
          {/* // new */}
<Card className="rounded-3xl border-zinc-800 bg-zinc-950/70">
          
          <CardHeader><CardTitle>Activity Feed</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {history.length ? history.map((item) => (
              // old
              // <div key={item.id} className="rounded-md border p-3">

                // new 
              <div key={item.id} className=" rounded-2xl border border-zinc-800  bg-black/40  p-4 " >



                <div className="text-sm">{item.prompt}</div>
                <div className="text-xs text-muted-foreground">{item.createdAt.toLocaleString()}</div>
              </div>
            )) : <p className="text-sm text-muted-foreground">Commands will appear here after execution.</p>}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
