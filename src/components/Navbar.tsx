import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const navbarBg = useTransform(scrollY, [0, 300], ["rgba(250, 250, 249, 0)", "rgba(250, 250, 249, 0.98)"]);
  const borderOpacity = useTransform(scrollY, [0, 300], [0, 0.1]);
  const textColor = useTransform(scrollY, [0, 300], ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"]);
  const logoOpacity = useTransform(scrollY, [400, 600], [0, 1]);

  const suggestions = [
    { label: "Ball Gowns", to: "/shop" },
    { label: "Evening Wear", to: "/shop" },
    { label: "Cocktail Dresses", to: "/shop" },
    { label: "Spring Collection", to: "/shop" },
    { label: "About Westelle", to: "/about" },
  ];
  const filtered = suggestions.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backgroundColor: isHomePage ? navbarBg : "rgba(250, 250, 249, 0.98)",
        }}
      >
        <motion.div 
          className="relative flex h-[4.5rem] w-full items-center justify-between px-8 lg:px-16"
          style={{
            borderBottom: isHomePage 
              ? `1px solid rgba(0, 0, 0, ${borderOpacity.get()})` 
              : "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Left - Search Icon */}
          <motion.button 
            aria-label="Search" 
            className="p-2 transition-all duration-300 hover:opacity-60"
            onClick={() => setSearchOpen(true)}
            style={{
              color: isHomePage ? textColor : "rgba(0, 0, 0, 1)"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </motion.button>

          {/* Center - Static Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <motion.a 
              href="/" 
              className="font-serif text-xl tracking-[0.4em]"
              style={{
                color: isHomePage ? textColor : "rgba(0, 0, 0, 1)",
                opacity: isHomePage ? logoOpacity : 1,
              }}
            >
              WESTELLE
            </motion.a>
          </div>

          {/* Right - Account, Wishlist, Cart & Menu Icons */}
          <div className="flex items-center gap-6">
            <Link 
              to={isAuthenticated ? "/account" : "/login"}
              aria-label="Account" 
              className="relative p-2 transition-all duration-300 hover:opacity-60"
            >
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{
                  color: isHomePage ? textColor : "rgba(0, 0, 0, 1)"
                }}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </motion.svg>
            </Link>

            <Link 
              to="/wishlist" 
              aria-label="Wishlist" 
              className="relative p-2 transition-all duration-300 hover:opacity-60"
            >
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{
                  color: isHomePage ? textColor : "rgba(0, 0, 0, 1)"
                }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </motion.svg>
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/cart" 
              aria-label="Cart" 
              className="relative p-2 transition-all duration-300 hover:opacity-60"
            >
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{
                  color: isHomePage ? textColor : "rgba(0, 0, 0, 1)"
                }}
              >
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </motion.svg>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <motion.button 
              aria-label="Menu" 
              onClick={() => setOpen(true)} 
              className="p-2 transition-all duration-300 hover:opacity-60"
              style={{
                color: isHomePage ? textColor : "rgba(0, 0, 0, 1)"
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-8 top-24 z-[61] w-full max-w-md"
            >
              <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-2xl">
                <div className="flex items-center gap-4 border-b border-neutral-200 px-6 py-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setSearchOpen(false);
                      if (e.key === "Enter" && filtered[0]) {
                        navigate(filtered[0].to);
                        setSearchOpen(false);
                        setQuery("");
                      }
                    }}
                    placeholder="Search for collections, gowns, dresses..."
                    className="flex-1 bg-transparent py-1 text-base outline-none placeholder:text-neutral-400"
                  />
                  <button 
                    onClick={() => setSearchOpen(false)} 
                    className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors"
                  >
                    ESC
                  </button>
                </div>
                <div className="max-h-80 overflow-auto py-2">
                  {(filtered.length ? filtered : suggestions).map((s, i) => (
                    <motion.button
                      key={s.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex w-full items-center justify-between px-6 py-3 text-left hover:bg-neutral-50 transition-colors"
                      onClick={() => {
                        navigate(s.to);
                        setSearchOpen(false);
                        setQuery("");
                      }}
                    >
                      <span className="text-sm">{s.label}</span>
                      <span className="text-xs text-neutral-400">→</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Menu Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="ml-auto flex h-full w-full max-w-md flex-col bg-[#fafaf9] p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-serif text-2xl tracking-[0.3em]">WESTELLE</span>
                <button 
                  onClick={() => setOpen(false)} 
                  aria-label="Close" 
                  className="text-sm tracking-wider hover:opacity-60 transition-opacity"
                >
                  CLOSE
                </button>
              </div>
              
              {/* User Info */}
              {isAuthenticated && user && (
                <div className="mb-8 rounded border border-neutral-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-serif text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex-1 space-y-6">
                <Link 
                  to="/" 
                  onClick={() => setOpen(false)}
                  className="block text-lg tracking-wide transition-opacity hover:opacity-60"
                >
                  Home
                </Link>
                <Link 
                  to="/shop" 
                  onClick={() => setOpen(false)}
                  className="block text-lg tracking-wide transition-opacity hover:opacity-60"
                >
                  Collections
                </Link>
                <Link 
                  to="/about" 
                  onClick={() => setOpen(false)}
                  className="block text-lg tracking-wide transition-opacity hover:opacity-60"
                >
                  About
                </Link>
                <Link 
                  to="/wishlist" 
                  onClick={() => setOpen(false)}
                  className="block text-lg tracking-wide transition-opacity hover:opacity-60"
                >
                  Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>
                <Link 
                  to="/cart" 
                  onClick={() => setOpen(false)}
                  className="block text-lg tracking-wide transition-opacity hover:opacity-60"
                >
                  Cart {totalItems > 0 && `(${totalItems})`}
                </Link>
                <Link 
                  to={isAuthenticated ? "/account" : "/login"}
                  onClick={() => setOpen(false)}
                  className="block text-lg tracking-wide transition-opacity hover:opacity-60"
                >
                  {isAuthenticated ? 'My Account' : 'Sign In'}
                </Link>
              </nav>

              <div className="mt-auto border-t border-black/10 pt-8">
                <p className="text-xs tracking-wider text-neutral-500">
                  © 2025 WESTELLE. All rights reserved.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}