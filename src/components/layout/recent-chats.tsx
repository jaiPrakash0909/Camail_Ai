"use client";

import { useEffect, useState } from "react";

export function RecentChats() {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/chat/recent")
      .then((res) => res.json())
      .then(setChats);
  }, []);

  return (
    <div className="mt-8">
      <p className="mb-3 px-3 text-xs uppercase tracking-wider text-zinc-500">
        Recent Chats
      </p>

      <div className="space-y-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="
w-full
overflow-hidden
rounded-xl
px-3
py-2
text-left
text-sm
text-zinc-400
hover:bg-zinc-900
hover:text-white
"
          >
            <div className="truncate">
                {chat.prompt.slice(0, 35)}
            </div>
            
          </button>
        ))}
      </div>
    </div>
  );
}