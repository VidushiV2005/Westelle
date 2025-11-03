import React, { useState } from 'react';
import { ArrowLeft, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductDetailModal from '@/components/ProductDetailModal';
import { products, ProductDetail } from '@/data/productData';

const ITEMS_PER_PAGE = 10;

// Size Selector Modal Component
function SizeSelector({ 
  sizes, 
  selectedSize, 
  onSelectSize, 
  onClose,
  onAddToCart 
}: { 
  sizes: string[]; 
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  onClose: () => void;
  onAddToCart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-sm shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-neutral-900">Select Size</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-sm text-neutral-600 mb-6 font-light tracking-wide">
          Please select a size to add this item to your cart
        </p>

        <div className="grid grid-cols-5 gap-3 mb-8">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSelectSize(size)}
              className={`py-3 text-sm tracking-wider transition-all duration-300 ${
                selectedSize === size
                  ? 'bg-neutral-900 text-white shadow-lg scale-105'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={onAddToCart}
          disabled={!selectedSize}
          className="w-full bg-neutral-900 text-white py-4 text-xs tracking-[0.3em] uppercase font-light transition-all duration-300 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
        >
          {selectedSize ? 'Add to Cart' : 'Select a Size'}
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, onViewDetails }: { 
  product: ProductDetail; 
  onViewDetails: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCartClick = () => {
    setShowSizeSelector(true);
  };

  const handleSizeSelected = (size: string) => {
    setSelectedSize(size);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
    
    setShowSizeSelector(false);
    setAdded(true);
    setSelectedSize(null);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCloseSizeSelector = () => {
    setShowSizeSelector(false);
    setSelectedSize(null);
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
    <>
      {/* Size Selector Modal */}
      {showSizeSelector && (
        <SizeSelector
          sizes={product.availableSizes || ['XS', 'S', 'M', 'L', 'XL']}
          selectedSize={selectedSize}
          onSelectSize={handleSizeSelected}
          onClose={handleCloseSizeSelector}
          onAddToCart={handleConfirmAddToCart}
        />
      )}

      <div 
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Success Notification */}
        {added && (
          <div className="fixed left-1/2 top-24 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-emerald-600 text-white px-8 py-3 rounded-sm shadow-2xl">
              <p className="text-sm tracking-[0.2em] uppercase font-light">Added to Cart</p>
            </div>
          </div>
        )}

        <div className="relative mb-6 overflow-hidden bg-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-700">
          <div className="aspect-[3/4]">
            <img 
              src={product.image} 
              alt={product.name}
              className={`h-full w-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-95' : 'scale-100'
              }`}
            />
          </div>
          
          {/* Elegant Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-700 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* Wishlist Heart */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 hover:scale-110 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            } ${
              inWishlist 
                ? 'bg-rose-500 text-white shadow-lg' 
                : 'bg-white/95 text-neutral-800 hover:bg-white shadow-md'
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className="h-5 w-5" 
              fill={inWishlist ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          </button>

          {/* Add to Cart - Elegant Button */}
          <div className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-700 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={handleAddToCartClick}
              className="w-full bg-white/95 backdrop-blur-sm py-4 text-xs tracking-[0.3em] uppercase text-neutral-900 font-light transition-all duration-300 hover:bg-white hover:shadow-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="space-y-3 px-1">
          <h3 className="font-serif text-xl text-neutral-900 tracking-tight transition-colors duration-300 group-hover:text-neutral-600">
            {product.name}
          </h3>
          
          {/* Description - Shows only on hover */}
          <div className={`overflow-hidden transition-all duration-500 ${
            isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-sm text-neutral-600 leading-relaxed font-light tracking-wide">
              {product.description}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <p className="font-light text-lg text-neutral-900 tracking-wide">
              ${product.price.toLocaleString()}
            </p>
            
            {/* View Details */}
            <button
              onClick={onViewDetails}
              className={`text-xs tracking-[0.2em] uppercase text-neutral-500 transition-all duration-300 hover:text-neutral-900 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Details →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (product: ProductDetail) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar Spacer */}
      <div className="h-16" />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Elegant Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white border-b border-neutral-100">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 py-20 lg:py-28">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="group mb-10 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            <span className="text-sm tracking-[0.2em] uppercase font-light">Back</span>
          </button>

          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-block">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-neutral-400 to-transparent mx-auto mb-10"></div>
            </div>
            <h1 className="font-serif text-6xl lg:text-8xl text-neutral-900 tracking-tight leading-tight">
              Elegant Collections
            </h1>
            <p className="text-neutral-600 text-lg lg:text-xl tracking-wide leading-relaxed font-light max-w-2xl mx-auto">
              Discover our curated selection of premium evening wear, where each piece is meticulously crafted for the modern woman who values timeless elegance and sophistication.
            </p>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-neutral-400 to-transparent mx-auto mt-10"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 py-20 lg:py-24">
        {/* Collection Info */}
        <div className="mb-16 text-center space-y-4">
          <p className="text-xs tracking-[0.4em] text-neutral-400 uppercase font-light">
            Showing {startIndex + 1}–{Math.min(endIndex, products.length)} of {products.length}
          </p>
          <p className="text-sm tracking-[0.3em] text-neutral-500 uppercase">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-20">
          {currentProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onViewDetails={() => handleViewDetails(product)}
            />
          ))}
        </div>

        {/* Elegant Pagination */}
        <div className="flex items-center justify-center gap-6 pt-12 border-t border-neutral-200">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-3 text-sm tracking-[0.2em] uppercase text-neutral-600 transition-all duration-300 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-600"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-light transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-6 py-3 text-sm tracking-[0.2em] uppercase text-neutral-600 transition-all duration-300 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-600"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}