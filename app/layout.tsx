import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "@/redux/StoreProvider";
import Register from "@/components/register/Register";
import ClientOnly from "@/components/ClientOnly";
import Login from "@/components/login/Login";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer";
import RegisterForEmployer from "@/components/Employer-register/RegisterForEmployer";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nest Employee ",
  description: "Nest Employee ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* StoreProvider for redux */}
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster position="top-center" />
          <ClientOnly>
            <Register />
            <RegisterForEmployer />
            <Login />
            <Navbar />
          </ClientOnly>
          {children}
          <Footer/>
        </body>
      </StoreProvider>
    </html>
  );
}
