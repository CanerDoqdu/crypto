import Navbar from "../components/AuthNavbar";
import "../globals.css";
import titillium_Web from "../fonts";
import { AuthContextProvider } from "@/context/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ScrollPreserver from "@/components/ScrollPreserver";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${titillium_Web.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedScroll = sessionStorage.getItem('scrollPos');
                  if (savedScroll) {
                    const scrollY = parseInt(savedScroll, 10);
                    if (document.documentElement) {
                      document.documentElement.scrollTop = scrollY;
                    }
                    if (document.body) {
                      document.body.scrollTop = scrollY;
                    }
                    window.scrollY = scrollY;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ScrollPreserver>
          <AuthContextProvider>
            <ErrorBoundary>
              <Navbar />
              {children}
            </ErrorBoundary>
          </AuthContextProvider>
        </ScrollPreserver>
      </body>
    </html>
  );
}
