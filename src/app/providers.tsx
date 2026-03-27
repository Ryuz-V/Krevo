"use client";

import { ShopProvider } from "@/contexts/ShopContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ShopProvider>{children}</ShopProvider>;
}