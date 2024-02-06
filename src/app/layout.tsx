import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header/Header";
import { cn } from "@/lib/utils";
import { IDBProvider } from "@/providers/idb";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: "Shopping",
  description: "Shopping app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "mt-14")}>
        <IDBProvider>
          <Header />
          {children}
          <Toaster />
        </IDBProvider>
      </body>
    </html>
  );
}
