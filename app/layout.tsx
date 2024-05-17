import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/modal-provider";
import ToastProvider from "@/components/toaster-provider";
import CrispProvider from "@/components/crisp-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS AI SaaS",
  description: "NextJS AI SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
