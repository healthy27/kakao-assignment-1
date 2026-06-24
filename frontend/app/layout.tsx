import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘 할 일 정리",
  description: "Next.js App Router + FastAPI로 만든 Todo 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full bg-app-bg text-text-primary">{children}</body>
    </html>
  );
}
