import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Memory Map — Chintala Sai Varun | Technical Blogs",
  description: "An interactive threat intelligence archive mapping secure systems engineering, malware classification, digital forensics, AI security, penetration testing, threat intelligence, and secure software engineering.",
  keywords: ["portfolio", "cybersecurity", "backend development", "react flow", "framer motion", "next.js", "technical blogs", "AI security", "penetration testing", "malware analysis", "threat intelligence", "secure software engineering"],
  authors: [{ name: "Chintala Sai Varun" }],
  openGraph: {
    title: "Chintala Sai Varun | Technical Blogs & Security Research Ledger",
    description: "Sharing practical insights from cybersecurity, AI security, penetration testing, malware analysis, threat intelligence, and secure software engineering.",
    url: "https://www.linkedin.com/pulse/what-100-tryhackme-labs-taught-me-cybersecurity-chintala-sai-varun-u2hcf/",
    siteName: "Sai Varun Portfolio",
    images: [
      {
        url: "/tryhackme_blog_thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Chintala Sai Varun Cybersecurity Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chintala Sai Varun | Technical Blogs",
    description: "Sharing practical insights from cybersecurity, AI security, penetration testing, malware analysis, threat intelligence, and secure software engineering.",
    images: ["/tryhackme_blog_thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
      style={{ colorScheme: "light dark" }}
    >
      <body className="min-h-full flex flex-col paper-texture select-none">
        {children}
      </body>
    </html>
  );
}
