import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
  onLoginRequired?: () => void; // ADD THIS
}

export default function ProductCard({ product, onViewDetails, onLoginRequired }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    // MODIFIED: Check if login is required
    const success = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    // If addToCart returns false, it means user is not logged in
    if (!success && onLoginRequired) {
      onLoginRequired();
      return;
    }
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 top-4 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-500 px-4 py-2 text-xs tracking-wider text-white shadow-lg"
          >
            ADDED TO CART
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-x-0 bottom-0 p-6"
            >
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="w-full bg-white py-3 text-xs tracking-[0.3em] text-black transition-all duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-green-500 disabled:text-white"
              >
                {added ? "ADDED" : "ADD TO CART"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleToggleWishlist}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
            inWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-black hover:bg-white'
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            className="h-5 w-5"
            fill={inWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </motion.button>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-sm tracking-wide text-neutral-800 transition-colors group-hover:text-black">
          {product.name}
        </h3>
        <p className="font-serif text-base text-black">
          ${product.price.toLocaleString()}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="mt-3"
      >
        <button
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 text-xs tracking-wider text-neutral-500 transition-colors hover:text-black"
        >
          <span>VIEW DETAILS</span>
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}