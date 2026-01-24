import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../globals.css";
import titillium_Web from "../fonts";
import { AuthContextProvider } from "@/context/AuthContext";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'COLD', // Buraya istediğin başlığı yaz
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
      <html lang="en" className={`${titillium_Web.variable}`}>
    
        <body suppressHydrationWarning>
        <AuthContextProvider>
          <Navbar />
          {children}
          <Footer/>
        </AuthContextProvider>
      </body>
      </html>
  
  );
}
