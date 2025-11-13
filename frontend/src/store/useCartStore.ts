import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.id === item.id);

    let updated;
    if (existing) {
      updated = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updated = [...items, item];
    }

    const total = updated.reduce((acc, i) => acc + i.price * i.quantity, 0);
    set({ items: updated, total });
  },

  removeItem: (id) => {
    const updated = get().items.filter((i) => i.id !== id);
    const total = updated.reduce((acc, i) => acc + i.price * i.quantity, 0);
    set({ items: updated, total });
  },

  clearCart: () => set({ items: [], total: 0 }),
}),
    { name: "cart-store" }
));
