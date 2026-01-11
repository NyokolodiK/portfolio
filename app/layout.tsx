import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/layout/PageTransition";
import StairTransition from "@/components/layout/StairTransition";
import ChatWrapper from "@/components/chat/ChatWrapper";
import StructuredData from "@/components/StructuredData";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetBrainsMono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kagiso-nyokolodi.dev'),
  title: {
    default: 'Kagiso Nyokolodi | Senior Software Engineer Portfolio',
    template: '%s | Kagiso Nyokolodi'
  },
  description: 'Results-driven Senior Frontend Engineer with expertise in building high-performance web applications. Specializing in React, Next.js, TypeScript, and scalable system design. Based in Meredale, Gauteng, South Africa.',
  keywords: [
    'Kagiso Nyokolodi',
    'Senior Software Engineer',
    'Frontend Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Web Development',
    'Software Engineer South Africa',
    'NTT DATA',
    'Full Stack Developer',
    'UI/UX Development',
    'Scalable Systems',
    'Portfolio'
  ],
  authors: [{ name: 'Kagiso Nyokolodi' }],
  creator: 'Kagiso Nyokolodi',
  publisher: 'Kagiso Nyokolodi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kagiso-nyokolodi.dev',
    siteName: 'Kagiso Nyokolodi Portfolio',
    title: 'Kagiso Nyokolodi | Senior Software Engineer',
    description: 'Results-driven Senior Frontend Engineer specializing in building high-performance web applications with React, Next.js, and TypeScript.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kagiso Nyokolodi - Senior Software Engineer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kagiso Nyokolodi | Senior Software Engineer',
    description: 'Results-driven Senior Frontend Engineer specializing in building high-performance web applications.',
    images: ['/og-image.png'],
    creator: '@kagiso_nyokolodi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={jetBrainsMono.variable}>
        <ThemeProvider>
          <Header />
          <StairTransition />
          <PageTransition>{children}</PageTransition>
          <ChatWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
