import Appbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Provider from "./Provider";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "blog-g-gers",
  description: "Be yourself",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider>
          <div className="h-screen overflow-hidden overflow-y-auto">
            <Appbar />
            <div className="h-[calc(100vh-75px)] ">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
