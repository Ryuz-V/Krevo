import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const isLoggedIn = !!token;

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}