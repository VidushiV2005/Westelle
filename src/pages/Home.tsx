import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Heart, User, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductDetailModal from '@/components/ProductDetailModal';
import { products, ProductDetail } from '@/data/productData';


const featured = products.slice(0, 4);
const showcaseProducts = products.slice(4, 10);
const galleryProducts = products.slice(10, 18);


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

function ProductCard({ product, showActions = true, onViewDetails }: { 
  product: ProductDetail; 
  showActions?: boolean;
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

      <motion.div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4 }}
      >
        
        {added && (
          <div className="fixed left-1/2 top-24 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-emerald-600 text-white px-8 py-3 rounded-sm shadow-2xl">
              <p className="text-sm tracking-[0.2em] uppercase font-light">Added to Cart</p>
            </div>
          </div>
        )}

       
        <div className="relative mb-6 overflow-hidden bg-neutral-50 shadow-md hover:shadow-2xl transition-all duration-700">
          <div className="aspect-[3/4]">
            <img
              src={product.image}
              alt={product.name}
              className={`h-full w-full object-cover transition-all duration-700 ${
                isHovered ? "scale-110 brightness-95" : "scale-100"
              }`}
            />
          </div>

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {showActions && (
            <>
              {/* Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 hover:scale-110 ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                } ${
                  inWishlist
                    ? "bg-rose-500 text-white shadow-lg"
                    : "bg-white/95 text-neutral-800 hover:bg-white shadow-md"
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={inWishlist ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              </button>

              {/*  Add to Cart Button */}
              <div
                className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-700 ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <button
                  onClick={handleAddToCartClick}
                  className="w-full bg-white/95 backdrop-blur-sm py-4 text-xs tracking-[0.3em] uppercase text-neutral-900 font-light transition-all duration-300 hover:bg-white hover:shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-3 px-1">
          <h3 className="font-serif text-xl text-neutral-900 tracking-tight transition-colors duration-300 group-hover:text-neutral-600">
            {product.name}
          </h3>

         
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm text-neutral-600 leading-relaxed font-light tracking-wide">
              {product.description}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <p className="font-light text-lg text-neutral-900 tracking-wide">
              ${product.price.toLocaleString()}
            </p>

            {/* View Details Button */}
            <button
              onClick={onViewDetails}
              className={`text-xs tracking-[0.2em] uppercase text-neutral-500 transition-all duration-300 hover:text-neutral-900 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Details →
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const logoScale = useTransform(scrollY, [0, 600], [1, 0.3]);
  const logoY = useTransform(scrollY, [0, 600], [0, -250]);
  const logoOpacity = useTransform(scrollY, [0, 400, 600], [1, 0.8, 0]);

  const handleViewDetails = (product: ProductDetail) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="bg-white">
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Hero Section with Animated Logo */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="/images/dresses/dress-15.jpeg"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        
        
        <div className="relative z-10 flex h-full items-center justify-center">
          <motion.div
            style={{ 
              scale: logoScale,
              y: logoY,
              opacity: logoOpacity
            }}
            className="text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="font-serif text-7xl tracking-[0.4em] text-white sm:text-8xl md:text-9xl"
            >
              WESTELLE
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mx-auto mt-8 h-[1px] bg-white/50"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-8 text-sm tracking-[0.5em] text-white/90"
            >
              HAUTE COUTURE
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-3 text-white/80"
          >
            <div className="h-12 w-[1px] bg-white/60" />
            <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured New Arrivals */}
      <section className="py-32 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <div className="inline-block mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-neutral-400 to-transparent"></div>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl tracking-wide text-neutral-900">New Arrivals</h2>
            <p className="mt-6 text-neutral-600 text-lg font-light tracking-wide max-w-2xl mx-auto">
              Discover our latest collection of exquisite evening wear, where timeless elegance meets contemporary sophistication
            </p>
          </motion.div>
          
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <ProductCard 
                  product={p} 
                  onViewDetails={() => handleViewDetails(p)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <a href="/shop" className="inline-block border-2 border-neutral-900 px-12 py-4 text-xs tracking-[0.3em] text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white">
              VIEW ALL COLLECTIONS
            </a>
          </motion.div>
        </div>
      </section>

      {/* Signature Collection Showcase - Dark Elegant Section */}
      <section className="relative py-32 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black"></div>
        </div>
        
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <div className="inline-block mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl tracking-wide">Signature Collection</h2>
            <p className="mt-6 text-neutral-400 text-lg font-light tracking-wide max-w-2xl mx-auto">
              Handcrafted masterpieces that define luxury and sophistication
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden cursor-pointer"
                onClick={() => handleViewDetails(product)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-neutral-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-xl text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-white/80 font-light mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-light text-white">${product.price.toLocaleString()}</span>
                    <button className="text-xs tracking-[0.2em] text-white/80 hover:text-white transition-colors">
                      DETAILS →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner - Spring Collection */}
      <section className="relative w-full">
        <div className="relative h-[80vh] w-full overflow-hidden">
          <img
            src="/images/dresses/dress-20.jpeg"
            alt="Spring Collection"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="container mx-auto px-8 lg:px-16">
            <div className="relative z-10 flex h-[80vh] items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1.2 }}
                className="max-w-xl"
              >
                <span className="inline-block text-xs tracking-[0.4em] text-white/80 mb-6">SPRING 2025</span>
                <h3 className="font-serif text-6xl leading-tight text-white mb-6">The Art of Elegance</h3>
                <div className="h-[1px] w-20 bg-white/60 mb-8" />
                <p className="text-xl leading-relaxed text-white/90 font-light mb-10">
                  Where delicate silhouettes meet timeless sophistication. Experience the pinnacle of haute couture craftsmanship.
                </p>
                <a href="/shop" className="inline-block border-2 border-white px-12 py-4 text-xs tracking-[0.3em] text-white transition-all duration-300 hover:bg-white hover:text-black">
                  EXPLORE COLLECTION
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Excellence */}
      <section className="py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-block mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-neutral-400 to-transparent"></div>
          </div>
          <h2 className="font-serif text-5xl lg:text-6xl tracking-wide text-neutral-900">
            Craftsmanship Excellence
          </h2>
          <p className="mt-6 text-neutral-600 text-lg font-light tracking-wide max-w-3xl mx-auto">
            Every Westelle creation embodies the perfect marriage of traditional couture techniques and contemporary design innovation
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { 
              title: "Hand Embroidery", 
              desc: "Each gown features intricate hand-embroidered details crafted by master artisans",
              img: "/images/dresses/dress-25.jpeg"
            },
            { 
              title: "Premium Fabrics", 
              desc: "Sourced exclusively from the world's finest textile houses in Paris and Milan",
              img: "/images/dresses/dress-30.jpeg"
            },
            { 
              title: "Bespoke Tailoring", 
              desc: "Perfectly crafted to your unique measurements for an impeccable fit",
              img: "/images/dresses/dress-35.jpeg"
            },
          ].map((item, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden transition-transform duration-500 ease-out"
            >
              {/* Image with Subtle Overlay */}
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Content */}
              <div className="mt-8 text-center md:text-left">
                <h3 className="font-serif text-2xl text-neutral-900 mb-3 transition-colors duration-300 group-hover:text-neutral-700">
                  {item.title}
                </h3>
                <div className="h-px w-12 bg-neutral-300 mb-4 mx-auto md:mx-0"></div>
                <p className="text-sm text-neutral-600 leading-relaxed font-light tracking-wide">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* Atelier Experience - Two Column Layout */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src="/images/dresses/dress-40.jpeg"
                  alt="Atelier"
                  className="h-[700px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 h-48 w-48 border-2 border-neutral-300 bg-white/90 backdrop-blur-sm" />
              <div className="absolute -left-8 -top-8 h-32 w-32 border-2 border-neutral-300 bg-white/90 backdrop-blur-sm" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block rounded-full bg-neutral-100 px-5 py-2 text-[10px] tracking-[0.4em] text-neutral-600 mb-8">
                OUR ATELIER
              </span>
              <h3 className="font-serif text-5xl lg:text-6xl leading-tight tracking-wide text-neutral-900 mb-8">
                Where artistry meets precision
              </h3>
              <div className="h-[2px] w-24 bg-gradient-to-r from-neutral-900 to-transparent mb-8" />
              <p className="text-lg leading-relaxed text-neutral-600 font-light mb-12">
                Every Westelle creation is born from the hands of master artisans in our Parisian atelier, where centuries-old couture techniques blend seamlessly with contemporary design innovation.
              </p>
              
              <div className="space-y-8">
                {[
                  {
                    icon: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z",
                    title: "Bespoke Tailoring",
                    desc: "Individual measurements and personalized fittings for the perfect silhouette"
                  },
                  {
                    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                    title: "Premium Fabrics",
                    desc: "Sourced from the finest mills in Europe and handpicked for quality"
                  },
                  {
                    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                    title: "Hand Finishing",
                    desc: "Meticulous attention to every stitch and seam by skilled artisans"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="group flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-200 bg-white transition-all duration-300 group-hover:border-neutral-900 group-hover:bg-neutral-900">
                        <svg className="h-6 w-6 text-neutral-400 transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg tracking-wider text-neutral-900 mb-2">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-neutral-600 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.a
                href="/about"
                whileHover={{ x: 4 }}
                className="mt-12 inline-flex items-center gap-3 text-sm tracking-wider transition-colors hover:text-neutral-600"
              >
                <span>DISCOVER OUR STORY</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <div className="inline-block mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-neutral-400 to-transparent"></div>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl tracking-wide text-neutral-900">Client Experiences</h2>
            <p className="mt-6 text-neutral-600 text-lg font-light tracking-wide max-w-2xl mx-auto">
              Discover what our clients say about their Westelle experience
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                quote: "The craftsmanship is unparalleled. My custom gown was a masterpiece that exceeded every expectation.",
                author: "Isabella M.",
                location: "New York",
              },
              { 
                quote: "Westelle transformed my vision into reality. The attention to detail and luxurious fabrics made me feel like royalty.",
                author: "Sophia K.",
                location: "London",
              },
              { 
                quote: "From consultation to final fitting, the experience was flawless. The gown was absolutely stunning.",
                author: "Olivia R.",
                location: "Paris",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden bg-white p-10 shadow-md transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="h-4 w-4 text-neutral-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-8 text-base leading-relaxed text-neutral-700 italic font-light">"{testimonial.quote}"</p>
                <div>
                  <p className="text-sm font-medium tracking-wide text-neutral-900">{testimonial.author}</p>
                  <p className="mt-1 text-xs tracking-wider text-neutral-400">{testimonial.location}</p>
                </div>
                <div className="absolute right-0 top-0 h-1 w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Features */}
      <section className="border-y border-neutral-200 py-24 bg-white">
        <div className="container mx-auto px-8 lg:px-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center text-[10px] tracking-[0.5em] text-neutral-400"
          >
            AS FEATURED IN
          </motion.p>
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-16 gap-y-12 md:grid-cols-5">
            {["Vogue", "Elle", "Harper's Bazaar", "InStyle", "WWD"].map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <span className="font-serif text-xl tracking-wide text-neutral-300 transition-colors duration-500 group-hover:text-neutral-900">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-32 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-neutral-400 to-transparent"></div>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl tracking-wide text-neutral-900 mb-6">
              Join Our Circle
            </h2>
            <p className="text-lg text-neutral-600 font-light tracking-wide mb-12">
              Be the first to discover new collections, exclusive offers, and style inspiration from Westelle
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border border-neutral-300 focus:border-neutral-900 focus:outline-none text-sm tracking-wide"
              />
              <button
                type="submit"
                className="px-10 py-4 bg-neutral-900 text-white text-xs tracking-[0.3em] uppercase hover:bg-neutral-800 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            
            <p className="mt-6 text-xs text-neutral-400 tracking-wide">
              By subscribing, you agree to our Privacy Policy and consent to receive updates
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exclusive Members Section - Login CTA */}
      <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-block">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-10"></div>
            </div>
            
            <h2 className="font-serif text-5xl lg:text-6xl tracking-wide">
              Become a Westelle Member
            </h2>
            
            <p className="text-lg lg:text-xl text-white/80 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
              Join our exclusive community and enjoy personalized styling, early access to new collections, and special member-only benefits
            </p>

            <div className="pt-6 grid gap-6 md:grid-cols-3 max-w-3xl mx-auto text-left">
              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium tracking-wide">Exclusive Access</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  First to shop new arrivals and limited editions
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium tracking-wide">Personal Styling</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Complimentary consultations with our expert stylists
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium tracking-wide">Special Offers</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Member-only promotions and birthday surprises
                </p>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="group relative px-12 py-4 bg-white text-neutral-900 text-xs tracking-[0.3em] uppercase font-light overflow-hidden transition-all duration-300 hover:bg-white/90"
              >
                <span className="relative z-10">Create Account</span>
              </button>
              
              <button
                onClick={() => navigate('/login')}
                className="px-12 py-4 border-2 border-white/30 text-white text-xs tracking-[0.3em] uppercase font-light transition-all duration-300 hover:bg-white hover:text-neutral-900 hover:border-white"
              >
                Sign In
              </button>
            </div>

            <p className="text-xs text-white/50 tracking-wide pt-4">
              Already a member? Sign in to access your account
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}