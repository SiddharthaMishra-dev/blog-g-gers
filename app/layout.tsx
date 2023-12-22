import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import Appbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blog-g-gers",
  description: "Be yourself",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="h-screen overflow-hidden overflow-y-auto">
            <Appbar />
            <div className="h-[calc(100vh-75px)]">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
