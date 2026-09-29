import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/slider.css";
import "@/styles/keyframe.css";
import "@/styles/loading.css";

import Navbar from "@/component/layout/Navber";
import { Toaster } from "sonner";
import FooterComponent from "@/component/layout/Footer";
import CustomCursor from "@/component/layout/CustomCursor";
import AOSInit from "@/component/share/AOSInit";

export const metadata: Metadata = {
  title: "Ali Hasan | Portfolio",
  description: "Portfolio of Ali Hasan",
  keywords: [
    "Ali Hasan",
    "Portfolio",
    "Frontend Developer",
    "Vue Developer",
    "React Developer",
    "Next.js Developer",
    "Alpine Developer",
    "JavaScript Developer",
    "Web Developer",
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <CustomCursor />
        <Navbar />
        {children}
        <FooterComponent />
        <AOSInit />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
