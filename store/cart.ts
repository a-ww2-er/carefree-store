import { create } from 'zustand';

export interface CartItem {
  asin: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  is_prime?: boolean;
  product_availability?: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (asin: string) => void;
  updateQuantity: (asin: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existing = state.cartItems.find((i) => i.asin === item.asin);
    if (existing) {
      return {
        cartItems: state.cartItems.map((i) =>
          i.asin === item.asin ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      };
    }
    return { cartItems: [...state.cartItems, item] };
  }),
  removeItem: (asin) => set((state) => ({
    cartItems: state.cartItems.filter((i) => i.asin !== asin),
  })),
  updateQuantity: (asin, quantity) => set((state) => ({
    cartItems: state.cartItems.map((i) =>
      i.asin === asin ? { ...i, quantity: Math.max(1, quantity) } : i
    ),
  })),
  clearCart: () => set({ cartItems: [] }),
})); 