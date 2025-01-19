
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import ReduxProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rivsy.ai - Generate Stunning Blogs in Seconds",
  description:
    "The most powerful AI blog generator. Create SEO-optimized content instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AuthProvider>
            <SidebarProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex">{children}</div>
                <Footer />
              </div>
            </SidebarProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
