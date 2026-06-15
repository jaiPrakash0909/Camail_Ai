import Link from "next/link";
import { redirect } from "next/navigation";
import {
Inbox,
CalendarDays,
Sparkles,
Settings,
Search,
Plus,
} from "lucide-react";

import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/features/search/global-search";

const workspaceItems = [
{
href: "/assistant",
label: "Assistant",
icon: Sparkles,
},
{
href: "/inbox",
label: "Inbox",
icon: Inbox,
},
{
href: "/calendar",
label: "Calendar",
icon: CalendarDays,
},
{
href: "/settings",
label: "Settings",
icon: Settings,
},
];

export async function AppShell({
children,
}: {
children: React.ReactNode;
}) {
const session = await auth();

if (!session?.user?.id) {
redirect("/login");
}

return ( <div className="flex min-h-screen bg-black text-white"> <aside className="hidden w-72 border-r border-zinc-800 bg-zinc-950 lg:flex lg:flex-col"> <div className="p-6"> <div className="flex items-center gap-3"> <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#127173] font-bold">
M </div>

```
        <div>
          <h2 className="font-semibold">
            MailPilot AI
          </h2>
          <p className="text-xs text-zinc-500">
            AI Workspace
          </p>
        </div>
      </div>

      <Button className="mt-6 w-full justify-start gap-2 rounded-xl">
        <Plus className="h-4 w-4" />
        New Chat
      </Button>
    </div>

    <div className="px-4">
      <p className="mb-3 px-3 text-xs uppercase tracking-wider text-zinc-500">
        Workspace
      </p>

      <nav className="space-y-1">
        {workspaceItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              flex items-center gap-3
              rounded-xl px-3 py-3
              text-zinc-400
              transition
              hover:bg-zinc-900
              hover:text-white
            "
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>

    <div className="mt-auto border-t border-zinc-800 p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
          {session.user.email?.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {session.user.name ?? "User"}
          </p>

          <p className="truncate text-xs text-zinc-500">
            {session.user.email}
          </p>
        </div>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/login",
          });
        }}
      >
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
        >
          Sign out
        </Button>
      </form>
    </div>
  </aside>

  <div className="flex flex-1 flex-col">
    <header className="sticky top-0 z-20 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-6">
        <Search className="h-4 w-4 text-zinc-500" />
        <GlobalSearch />
      </div>
    </header>

    <main className="flex-1 p-6">
      {children}
    </main>
  </div>
</div>


);
}


































// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { CalendarDays, Inbox, LayoutDashboard, Search, Settings, Sparkles } from "lucide-react";
// import { auth, signOut } from "@/lib/auth";
// import { Button } from "@/components/ui/button";
// import { GlobalSearch } from "@/features/search/global-search";

// const navItems = [
//   { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/inbox", label: "Inbox", icon: Inbox },
//   { href: "/calendar", label: "Calendar", icon: CalendarDays },
//   { href: "/assistant", label: "Assistant", icon: Sparkles },
//   { href: "/settings", label: "Settings", icon: Settings }
// ];

// export async function AppShell({ children }: { children: React.ReactNode }) {
//   const session = await auth();

//   if (!session?.user?.id) {
//     redirect("/login");
//   }

//   return (
//     <div className="min-h-screen">
//       <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r glass lg:block">
//         <div className="flex h-full flex-col p-4">
          
//           <Link href="/dashboard" className="mb-6 flex items-center gap-3 px-2 text-lg font-semibold">
//             <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">M</span>
//             Corsair Agent AI
//           </Link>
//           <nav className="space-y-1">
//             {navItems.map((item) => (
//               <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
//                 <item.icon className="h-4 w-4" />
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//           <form
//             action={async () => {
//               "use server";
//               await signOut({ redirectTo: "/login" });
//             }}
//             className="mt-auto"
//           >
//             <Button type="submit" variant="secondary" className="w-full">Sign out</Button>
//           </form>
//         </div>
//       </aside>
//       <main className="lg:pl-64">
//         <header className="sticky top-0 z-10 border-b glass">
//           <div className="flex h-16 items-center gap-3 px-4 lg:px-8">
//             <Search className="h-4 w-4 text-muted-foreground" />
//             <GlobalSearch />
//             <span className="ml-auto hidden text-sm text-muted-foreground sm:block">{session.user.email}</span>
//           </div>
//         </header>
//         <div className="px-4 py-6 lg:px-8">{children}</div>
//       </main>
//     </div>
//   );
// }
