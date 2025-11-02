import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  fabric?: string;
  color?: string;
  fitType?: string;
  length?: string;
  availableSizes?: string[];
  closure?: string;
  careInstructions?: string;
  occasion?: string;
}

interface ProductDetailModalProps {
  product: ProductDetail;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose();
    }, 1500);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-neutral-800 transition-all duration-300 hover:bg-neutral-900 hover:text-white shadow-lg"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success Notification */}
        {addedToCart && (
          <div className="absolute left-1/2 top-24 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-emerald-600 text-white px-8 py-4 rounded-sm shadow-2xl">
              <p className="text-sm tracking-[0.2em] uppercase font-light">Added to Cart Successfully</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Image Section */}
          <div className="relative bg-neutral-50">
            <div className="sticky top-0 aspect-[3/4] md:aspect-auto md:h-screen">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right: Details Section */}
          <div className="p-8 md:p-12 lg:p-16 space-y-8">
            {/* Header */}
            <div className="space-y-4 border-b border-neutral-200 pb-8">
              <div className="inline-block">
                <div className="h-px w-16 bg-neutral-300"></div>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl text-neutral-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-neutral-900 tracking-wide">
                ${product.price.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500 font-light">
                Description
              </h3>
              <p className="text-neutral-700 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="space-y-6 border-t border-neutral-200 pt-8">
              <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500 font-light mb-4">
                Product Details
              </h3>
              
              <div className="grid grid-cols-2 gap-6 text-sm">
                {product.fabric && (
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-xs mb-1">Fabric</p>
                    <p className="text-neutral-900 font-light">{product.fabric}</p>
                  </div>
                )}
                {product.color && (
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-xs mb-1">Color</p>
                    <p className="text-neutral-900 font-light">{product.color}</p>
                  </div>
                )}
                {product.fitType && (
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-xs mb-1">Fit Type</p>
                    <p className="text-neutral-900 font-light">{product.fitType}</p>
                  </div>
                )}
                {product.length && (
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-xs mb-1">Length</p>
                    <p className="text-neutral-900 font-light">{product.length}</p>
                  </div>
                )}
                {product.closure && (
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-xs mb-1">Closure</p>
                    <p className="text-neutral-900 font-light">{product.closure}</p>
                  </div>
                )}
                {product.occasion && (
                  <div>
                    <p className="text-neutral-500 uppercase tracking-wider text-xs mb-1">Occasion</p>
                    <p className="text-neutral-900 font-light">{product.occasion}</p>
                  </div>
                )}
              </div>

              {product.careInstructions && (
                <div className="pt-4">
                  <p className="text-neutral-500 uppercase tracking-wider text-xs mb-2">Care Instructions</p>
                  <p className="text-neutral-700 font-light text-sm">{product.careInstructions}</p>
                </div>
              )}
            </div>

            {/* Size Selection */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500 font-light">
                  Select Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 text-sm tracking-wider transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500 font-light">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-12 w-12 flex items-center justify-center bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-xl font-light text-neutral-900 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-12 w-12 flex items-center justify-center bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className="w-full bg-neutral-900 text-white py-5 text-xs tracking-[0.3em] uppercase font-light transition-all duration-300 hover:bg-neutral-800 disabled:bg-emerald-600 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="h-5 w-5" />
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`w-full py-5 text-xs tracking-[0.3em] uppercase font-light transition-all duration-300 flex items-center justify-center gap-3 ${
                  inWishlist
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={inWishlist ? 'currentColor' : 'none'}
                />
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-neutral-200 pt-8 space-y-4 text-sm text-neutral-600">
              <div className="flex items-start gap-3">
                <div className="mt-1">✓</div>
                <p className="font-light">Free shipping on orders over $200</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">✓</div>
                <p className="font-light">Easy returns within 30 days</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">✓</div>
                <p className="font-light">Authentic luxury materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}