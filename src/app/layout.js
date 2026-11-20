import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "PathoWatch - AMR Medical Surveillance",
  description:
    "Public-health platform for antimicrobial resistance (AMR) surveillance, AI/ML early warning, and outbreak monitoring.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
