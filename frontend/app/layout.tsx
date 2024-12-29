import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best AI Tools Directory",
  description: "A curated directory of the best AI tools and resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* TrustBox script */}
        <script 
          type="text/javascript" 
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" 
          async
        />
        {/* End TrustBox script */}
      </head>
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
