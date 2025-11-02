import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} /> 
               <Route path="/login" element={<Account />} />
               <Route 
    path="/account" 
    element={
        <ProtectedRoute>
          <Account />
        </ProtectedRoute>
     } 
  />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  );
}