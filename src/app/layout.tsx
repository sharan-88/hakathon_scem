import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Internship Portal",
  description: "Connect students with trusted companies through college-verified opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col relative`}>
        {/* Global background image with gradient overlay */}
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "linear-gradient(135deg, #D6AED6cc, #98D9E1cc), url('/br-register-login.png')" }} />
        {/* Content wrapper to ensure text color adapts for contrast */}
        <div className="relative z-10 flex-grow flex flex-col text-gray-900 dark:text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
