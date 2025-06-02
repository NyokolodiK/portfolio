import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/layout/PageTransition";
import StairTransition from "@/components/layout/StairTransition";
import ChatWrapper from "@/components/chat/ChatWrapper";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetBrainsMono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kagiso Nyokolodi Portfolio",
  description: "Kagiso Nyokolodi Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.variable}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <ChatWrapper />
      </body>
    </html>
  );
}
