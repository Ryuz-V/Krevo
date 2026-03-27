"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

export interface CartItem extends ShopProduct {
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: ShopProduct[];
  checkoutItem: ShopProduct | null;
  addToCart: (product: ShopProduct) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (product: ShopProduct) => void;
  isWishlisted: (productId: string) => boolean;
  setCheckoutItem: (product: ShopProduct | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<ShopProduct[]>([]);
  const [checkoutItem, setCheckoutItem] = useState<ShopProduct | null>(null);

  // Initialize from default browser storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("krevo_cart");
      const savedWishlist = localStorage.getItem("krevo_wishlist");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {}
  }, []);

  // Sync to local storage on mutation
  useEffect(() => {
    localStorage.setItem("krevo_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("krevo_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: ShopProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product: ShopProduct) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        checkoutItem,
        addToCart,
        removeFromCart,
        toggleWishlist,
        isWishlisted,
        setCheckoutItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
