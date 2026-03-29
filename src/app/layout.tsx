import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: '--font-dm-sans' });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: '--font-bebas-neue' });

export const metadata: Metadata = {
  title: "Low Light Image Enhancement Using Transformers",
  description: "AI-powered low-light image enhancement using Vision Transformers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${bebasNeue.variable} font-sans`}>
        {/* Grain Overlay */}
        <div className="grain-overlay"></div>

        {/* Background Orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        
        {children}
      </body>
    </html>
  );
}
