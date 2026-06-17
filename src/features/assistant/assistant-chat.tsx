"use client";

import { Send, Sparkles, Mail, Calendar, Inbox } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function send() {
    if (!prompt.trim()) return;

    const current = prompt;

    setMessages((items) => [
      ...items,
      {
        role: "user",
        content: current,
      },
    ]);

    setPrompt("");
    setIsSending(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: current,
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        toast.error(body.error ?? "Assistant failed");
        return;
      }

      setMessages((items) => [
        ...items,
        {
          role: "assistant",
          content:
            body.message ??
            `Executed ${body.command?.actions?.length ?? 0} action(s).`,
        },
      ]);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            MailPilot AI
          </h1>

          <p className="text-sm text-muted-foreground">
            Your email and calendar copilot
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 overflow-hidden rounded-3xl border">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {!messages.length ? (
              <div className="flex h-full flex-col items-center justify-center">
                <h2 className="mb-3 text-4xl font-bold">
                  Good Evening 👋
                </h2>

                <p className="mb-10 text-muted-foreground">
                  What would you like to do today?
                </p>

                <div className="grid w-full max-w-5xl gap-4 md:grid-cols-2">
                  <button
                    onClick={() =>
                      setPrompt("Draft a professional email")
                    }
                    className="rounded-2xl border p-5 text-left transition hover:bg-muted"
                  >
                    <Mail className="mb-3 h-5 w-5" />
                    <div className="font-medium">
                      Draft Email
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Create professional emails
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setPrompt(
                        "Schedule a meeting tomorrow"
                      )
                    }
                    className="rounded-2xl border p-5 text-left transition hover:bg-muted"
                  >
                    <Calendar className="mb-3 h-5 w-5" />
                    <div className="font-medium">
                      Schedule Meeting
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Create calendar events
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setPrompt(
                        "Show important emails"
                      )
                    }
                    className="rounded-2xl border p-5 text-left transition hover:bg-muted"
                  >
                    <Inbox className="mb-3 h-5 w-5" />
                    <div className="font-medium">
                      Important Emails
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Find priority emails
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setPrompt("Summarize my inbox")
                    }
                    className="rounded-2xl border p-5 text-left transition hover:bg-muted"
                  >
                    <Sparkles className="mb-3 h-5 w-5" />
                    <div className="font-medium">
                      Summarize Inbox
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI inbox summary
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-3xl px-5 py-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-3">
              <Textarea
                value={prompt}
                onChange={(e) =>
                  setPrompt(e.target.value)
                }
                placeholder="Ask MailPilot anything..."
                className="min-h-[80px] resize-none"
              />

              <Button
                onClick={send}
                disabled={isSending}
                className="h-[80px] w-[80px] rounded-2xl"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}















