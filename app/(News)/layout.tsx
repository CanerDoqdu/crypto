import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import "@/app/globals.css";
import titillium_Web from "@/app/fonts";
import { AuthContextProvider } from "@/context/AuthContext";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News | COLD',
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${titillium_Web.variable}`}>
      <body suppressHydrationWarning>
        <AuthContextProvider>
          <div className="min-h-screen bg-black">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
