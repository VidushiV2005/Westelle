import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Omit<CartItem, 'qty'>) => void;
  updateQty: (id: string | number, qty: number) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, 'qty'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: string | number, qty: number) => {
    if (qty < 1) return;
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const removeFromCart = (id: string | number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        totalItems,
        totalPrice, 
        addToCart, 
        updateQty, 
        removeFromCart, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}