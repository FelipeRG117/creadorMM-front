
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gray-100 text-gray-900"
      >
        <Navbar/>
        <main className="min-h-screen">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
