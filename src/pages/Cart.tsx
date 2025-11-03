import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetailModal from '@/components/ProductDetailModal';
import { products, ProductDetail } from '@/data/productData';

export default function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQty, removeFromCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Cart items:", items);
    console.log("Total items:", items.length);
  }, [items]);

  const handleProductClick = (item: any) => {
    console.log("Clicked item:", item);
    console.log("All products:", products);
    
  
    let baseProductId = item.id;
    if (item.id.includes('-') && item.size) {
      
      const parts = item.id.split('-');
      parts.pop(); 
      baseProductId = parts.join('-');
    }
    
    
    let product = products.find(p => p.id === baseProductId);
    
    
    if (!product) {
      product = products.find(p => p.id === item.id);
    }
    
  
    if (!product) {
      product = products.find(p => p.name === item.name);
    }
    
    console.log("Found product:", product);
    
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      console.error("Product not found for item:", item);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

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

          <h1 className="font-serif text-5xl tracking-wide">Shopping Cart</h1>
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
              <svg className="h-16 w-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-neutral-800">Your cart is empty</h2>
            <p className="mt-3 text-neutral-500">Discover our exquisite collections</p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 inline-block border border-black bg-black px-12 py-4 text-xs tracking-[0.3em] text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              CONTINUE SHOPPING
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group mb-6 border-b border-neutral-200 pb-6 last:border-b-0"
                  >
                    <div className="flex gap-6">
                      <div 
                        onClick={() => handleProductClick(item)}
                        className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-neutral-100 cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 
                            onClick={() => handleProductClick(item)}
                            className="text-lg tracking-wide text-neutral-900 cursor-pointer hover:text-neutral-600 transition-colors"
                          >
                            {item.name}
                          </h3>
                          
                          {/* Display Size */}
                          {item.size && (
                            <p className="mt-1 text-sm text-neutral-500">
                              Size: <span className="font-medium text-neutral-700">{item.size}</span>
                            </p>
                          )}
                          
                          <p className="mt-2 font-serif text-xl text-black">
                            ${item.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center gap-8">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                              disabled={item.qty <= 1}
                              className="flex h-8 w-8 items-center justify-center border border-neutral-300 text-neutral-600 transition-all duration-200 hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="flex h-8 w-8 items-center justify-center border border-neutral-300 text-neutral-600 transition-all duration-200 hover:border-black hover:text-black"
                              aria-label="Increase quantity"
                            >
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-xs tracking-wider text-neutral-400 transition-colors duration-200 hover:text-red-600"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>REMOVE</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <p className="font-serif text-xl text-black">
                          ${(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
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
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 border border-neutral-200 bg-white p-8">
                <h2 className="font-serif text-2xl tracking-wide">Order Summary</h2>
                <div className="mt-6 h-[1px] bg-neutral-200" />

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="text-neutral-400">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span className="text-neutral-400">Calculated at checkout</span>
                  </div>
                </div>

                <div className="my-6 h-[1px] bg-neutral-200" />

                <div className="flex items-baseline justify-between">
                  <span className="text-sm tracking-wider text-neutral-600">TOTAL</span>
                  <span className="font-serif text-3xl text-black">${totalPrice.toFixed(2)}</span>
                </div>

                <button className="mt-8 w-full bg-black py-4 text-xs tracking-[0.3em] text-white transition-all duration-300 hover:bg-neutral-800">
                  PROCEED TO CHECKOUT
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>

                <div className="mt-6 border-t border-neutral-200 pt-6">
                  <p className="mb-3 text-xs tracking-wider text-neutral-400">WE ACCEPT</p>
                  <div className="flex flex-wrap gap-3">
                    {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL'].map((method) => (
                      <div
                        key={method}
                        className="flex h-8 items-center justify-center rounded border border-neutral-200 bg-neutral-50 px-3 text-[10px] tracking-wider text-neutral-500"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}