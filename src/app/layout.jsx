import { Lato } from "next/font/google";
import "./globals.css";
import IntroController from "@/components/intro/IntroController";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "VedhEra — See Beyond. Think Ahead. Lead Forward.",
  description:
    "VedhEra is a creative agency offering graphic design, website design, digital marketing, and exhibition stall design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[var(--color-graphite)] text-[var(--color-soft-white)]">
        <IntroController>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </IntroController>
      </body>
    </html>
  );
}