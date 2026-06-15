import type { Metadata } from "next";
// Suppress TypeScript error for side-effect CSS import when no declaration file is present
// @ts-ignore
import "./globals.css";
import { Providers } from "@/components/layout/providers";

export const metadata: Metadata = {
  title: "Corsair Agent AI",
  description: "AI command center for Gmail and Google Calendar through Corsair"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
