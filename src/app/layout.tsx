import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "KREVO.ID",
  description: "E-Commerce website for KREVO.ID collection 2026.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body
        className={`${jakartaSans.variable} font-sans antialiased bg-white text-gray-900 selection:bg-black selection:text-white`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
}