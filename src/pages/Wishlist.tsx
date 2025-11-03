import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function Wishlist() {
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRemoveFromWishlist, setShouldRemoveFromWishlist] = useState(false);
  const [showSizeAlert, setShowSizeAlert] = useState(false);

  const handleMoveToCart = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSizeAlert(true);
    setTimeout(() => setShowSizeAlert(false), 2500);
    setShouldRemoveFromWishlist(true);
    const productWithDetails = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description || 'A beautiful piece from our curated collection, crafted with attention to detail and quality materials.',
      fabric: item.fabric || 'Premium Quality Fabric',
      color: item.color || 'As Shown',
      fitType: item.fitType || 'Regular Fit',
      length: item.length || 'Standard Length',
      availableSizes: item.availableSizes || ['XS', 'S', 'M', 'L', 'XL'],
      closure: item.closure || 'Standard Closure',
      careInstructions: item.careInstructions || 'Hand wash or dry clean recommended. Do not bleach. Iron on low heat.',
      occasion: item.occasion || 'Casual & Formal',
    };
    setSelectedProduct(productWithDetails);
    setIsModalOpen(true);
  };

  const handleProductClick = (item: any) => {
    // Ensure the product has all required fields for the modal
    const productWithDetails = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description || 'A beautiful piece from our curated collection, crafted with attention to detail and quality materials.',
      fabric: item.fabric || 'Premium Quality Fabric',
      color: item.color || 'As Shown',
      fitType: item.fitType || 'Regular Fit',
      length: item.length || 'Standard Length',
      availableSizes: item.availableSizes || ['XS', 'S', 'M', 'L', 'XL'],
      closure: item.closure || 'Standard Closure',
      careInstructions: item.careInstructions || 'Hand wash or dry clean recommended. Do not bleach. Iron on low heat.',
      occasion: item.occasion || 'Casual & Formal',
    };
    setSelectedProduct(productWithDetails);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    if (shouldRemoveFromWishlist && selectedProduct) {
      removeFromWishlist(selectedProduct.id);
    }
    setShouldRemoveFromWishlist(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
      <div className="container mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm tracking-wider text-neutral-600 transition-colors hover:text-black"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
            <span>BACK</span>
          </button>

          <h1 className="font-serif text-5xl tracking-wide">Wishlist</h1>
          <div className="mt-4 h-[1px] w-20 bg-black/20" />
          <p className="mt-4 text-sm tracking-wide text-neutral-500">
            {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-20 text-center"
          >
            <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-neutral-100">
              <svg className="h-16 w-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-neutral-800">Your wishlist is empty</h2>
            <p className="mt-3 text-neutral-500">Save your favorite items for later</p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 inline-block border border-black bg-black px-12 py-4 text-xs tracking-[0.3em] text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              DISCOVER COLLECTIONS
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative"
                >
                  <div 
                    className="relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(item.id);
                      }}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm opacity-0 transition-all duration-300 hover:bg-red-500 hover:text-white group-hover:opacity-100"
                      aria-label="Remove from wishlist"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button
                        onClick={(e) => handleMoveToCart(item, e)}
                        className="w-full bg-white py-3 text-xs tracking-[0.3em] text-black transition-all duration-300 hover:bg-black hover:text-white"
                      >
                        MOVE TO CART
                      </button>
                    </div>
                  </div>

                  <div 
                    className="mt-4 cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    <h3 className="text-sm tracking-wide text-neutral-800">{item.name}</h3>
                    <p className="mt-2 font-serif text-base text-black">${item.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sm tracking-wider text-neutral-600 transition-colors hover:text-black"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
              <span>CONTINUE SHOPPING</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}