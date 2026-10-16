import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bidhub.in"),
  applicationName: "Leven",
  title: {
    default: "Leven | Buy & Sell Through Live Shows",
    template: "%s | Leven",
  },
  description:
    "Leven is a live auction platform where you bid in real time, discover unique finds, and win deals worth bragging about. Find your next sale.",
  keywords: [
    "live shows",
    "live auctions",
    "online bidding",
    "real-time auctions",
    "auction platform India",
    "Leven",
  ],

  openGraph: {
    type: "website",
    url: "https://bidhub.in",
    siteName: "Leven",
    title: "Leven | Buy & Sell Through Live Shows",
    description:
      "Bid live, win fast. Discover unique items and join real-time auctions on Leven.",
    images: [
      {
        url: "https://res.cloudinary.com/diery17cm/image/upload/v1792149580/copy_of_logo_bvyhil.png",
        width: 1200,
        height: 630,
        alt: "Leven | Buy & Sell Through Live Shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leven | Buy & Sell Through Live Shows",
    description:
      "Bid live, win fast. Discover unique items and join real-time auctions on Leven.",
    images: [
      "https://res.cloudinary.com/diery17cm/image/upload/v1792149580/copy_of_logo_bvyhil.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors={true} position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
