import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type WishlistState = { items: WishlistItem[] };

type WishlistAction =
  | { type: "ADD"; item: WishlistItem }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "LOAD"; items: WishlistItem[] };

type WishlistContextType = {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clear: () => void;
  totalItems: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "LOAD":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return state;
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] }, (initial) => {
    // Load from sessionStorage on mount
    const stored = sessionStorage.getItem('westelle_wishlist');
    return stored ? { items: JSON.parse(stored) } : initial;
  });

  // Save to sessionStorage whenever items change
  useEffect(() => {
    sessionStorage.setItem('westelle_wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.length;

  const addToWishlist = (item: WishlistItem) => {
    dispatch({ type: "ADD", item });
  };

  const removeFromWishlist = (id: string) => {
    dispatch({ type: "REMOVE", id });
  };

  const isInWishlist = (id: string) => {
    return state.items.some((item) => item.id === id);
  };

  const clear = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <WishlistContext.Provider 
      value={{
        items: state.items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clear,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}