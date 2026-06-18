"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function RecentChats() {
  const [chats, setChats] = useState<any[]>([]);

useEffect(() => {
  const loadChats = () => {
    fetch("/api/chat/recent")
      .then((res) => res.json())
      .then(setChats);
  };

  loadChats();

  const interval = setInterval(loadChats, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="mt-8">
      <p className="mb-3 px-3 text-xs uppercase tracking-wider text-zinc-500">
        Recent Chats
      </p>

      <div className="space-y-1">
        {chats.map((chat) => (
//           <Link
//   key={chat.id}
//   href={`/assistant/${chat.id}`}
//   className="
//   block
//   w-full
//   overflow-hidden
//   rounded-xl
//   px-3
//   py-2
//   text-left
//   text-sm
//   text-zinc-400
//   hover:bg-zinc-900
//   hover:text-white
// "
// >
//   <div className="truncate">
//     {chat.prompt.slice(0, 35)}
//   </div>
// </Link>

<Link
  key={chat.id}
  href={`/assistant/${chat.id}`}
  className="
    block
    rounded-xl
    border
    border-transparent
    px-3
    py-2
    text-sm
    text-zinc-400
    transition-all
    hover:border-zinc-800
    hover:bg-zinc-900
    hover:text-white
  "
>
  <div className="truncate font-medium">
    {chat.prompt.slice(0, 35)}
  </div>

  
</Link>
        ))}
      </div>
    </div>
  );
}