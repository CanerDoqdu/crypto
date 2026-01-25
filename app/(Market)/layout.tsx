import "../globals.css";
import titillium_Web from "../fonts";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: 'Markets - COLD',
  description: 'Cryptocurrency markets and prices',
}

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${titillium_Web.variable}`}>
      <body suppressHydrationWarning>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
