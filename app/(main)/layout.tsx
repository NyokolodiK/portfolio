import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/layout/PageTransition";
import StairTransition from "@/components/layout/StairTransition";
import ChatWrapper from "@/components/chat/ChatWrapper";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetBrainsMono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={jetBrainsMono.variable}>
        <ThemeProvider>
          <Header />
          <StairTransition />
          <PageTransition>{children}</PageTransition>
          <ChatWrapper />
        </ThemeProvider>
    </div>
  );
}
