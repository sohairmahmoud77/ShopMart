import { UserContextProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {/* ****/}
        <Toaster position="top-center" reverseOrder={false} />

        <QueryProvider>
          <UserContextProvider>
            <CartProvider>
              {/****/}
              <Navbar /> 

              {/* ****/}
              <main className="container mx-auto px-4 mt-24 mb-10 flex-grow">
                {children}
              </main>

              {/****/}
              <Footer />
            </CartProvider>
          </UserContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}