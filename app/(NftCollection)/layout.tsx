import Navbar from "../components/AuthNavbar";
import "../globals.css";
import titillium_Web from "../fonts";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${titillium_Web.variable}`}>
      <body className="bg-black h-full" suppressHydrationWarning>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
