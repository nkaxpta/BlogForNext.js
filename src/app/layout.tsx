import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import { Outfit } from "next/font/google";
import Script from "next/script";

const googleFont = Outfit({
  weight: ["200", "600"],
  // weight: "400",
  preload: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "エンジニアになった元数学教師の記録",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`bg-slate-200 ${googleFont.className} `}>
        <Script src="//cdn.iframe.ly/embed.js" strategy="lazyOnload" />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container pt-4 mx-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
