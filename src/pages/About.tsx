import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart, Leaf, Award, Users, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const { scrollY: scrollYMotion } = useScroll();
  
  const logoScale = useTransform(scrollYMotion, [0, 400], [1, 0.8]);
  const logoOpacity = useTransform(scrollYMotion, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  const sizeGuide = {
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    measurements: [
      { size: 'XS', bust: '81-84', waist: '61-64', hips: '89-92' },
      { size: 'S', bust: '86-89', waist: '66-69', hips: '94-97' },
      { size: 'M', bust: '91-94', waist: '71-74', hips: '99-102' },
      { size: 'L', bust: '96-99', waist: '76-79', hips: '104-107' },
      { size: 'XL', bust: '101-104', waist: '81-84', hips: '109-112' }
    ]
  };

  const faqs = [
    {
      question: "How do I choose the right size?",
      answer: "Please refer to our size guide above. We recommend taking your measurements and comparing them with our chart. If you're between sizes, we suggest sizing up for a more comfortable fit. For personalized assistance, contact our styling team."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 14 days of delivery for unworn, unwashed items with original tags. Items must be in their original condition. Custom-made pieces are final sale. Please contact us to initiate a return."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 5-7 business days within India. International orders take 10-15 business days. Express shipping options are available at checkout. You'll receive tracking information once your order ships."
    },
    {
      question: "Do you offer custom alterations?",
      answer: "Yes, we offer complimentary minor alterations for purchases above ₹15,000. For custom tailoring or significant modifications, please contact our atelier for personalized consultation and pricing."
    },
    {
      question: "How should I care for my Westelle pieces?",
      answer: "Each garment comes with specific care instructions. Generally, we recommend dry cleaning for our delicate pieces. Store in a cool, dry place away from direct sunlight. Use padded hangers for structured pieces."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping costs and customs duties vary by destination. Please check our shipping page or contact us for specific information about your location."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-white pt-24">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => window.history.back()}
          className="absolute left-8 top-28 lg:left-16 lg:top-32 z-10 group flex items-center gap-2 text-neutral-800 hover:text-neutral-600 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
          <span className="text-sm tracking-[0.2em] uppercase font-light">Return</span>
        </motion.button>

        <div className="container mx-auto px-6 lg:px-16 xl:px-24 pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-10 lg:pr-12"
            >
              {/* Decorative Element */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-[2px] bg-neutral-900"
              />

              {/* Main Heading */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h1 className="font-serif text-6xl lg:text-8xl text-neutral-900 tracking-tight leading-[0.95] mb-4">
                    About
                  </h1>
                  <h1 className="font-serif text-6xl lg:text-8xl text-neutral-900 tracking-tight leading-[0.95]">
                    Westelle
                  </h1>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex items-center gap-4 pt-4"
                >
                  <div className="h-px w-12 bg-neutral-300"></div>
                  <Sparkles className="h-5 w-5 text-neutral-400" />
                  <div className="h-px w-12 bg-neutral-300"></div>
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-2xl lg:text-3xl font-light text-neutral-700 leading-relaxed italic"
              >
                Where timeless grace meets modern artistry
              </motion.p>

              {/* Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="space-y-6 text-lg text-neutral-600 font-light leading-relaxed"
              >
                <p>
                  Westelle embodies the essence of refined elegance, creating haute couture that celebrates the modern woman. Each piece tells a story of craftsmanship, sophistication, and timeless beauty.
                </p>
                <p>
                  Founded on the principles of exceptional quality and artistic expression, we craft garments that transcend fleeting trends and become cherished parts of your wardrobe.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200"
              >
                {[
                  { number: "2020", label: "Est." },
                  { number: "5000+", label: "Pieces" },
                  { number: "50+", label: "Countries" }
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <p className="font-serif text-4xl text-neutral-900 mb-1">{stat.number}</p>
                    <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Image Composition */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="relative aspect-[3/4] overflow-hidden"
                >
                  <img
                    src="/images/dresses/dress-15.jpeg"
                    alt="Westelle Elegance"
                    className="h-full w-full object-cover"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </motion.div>

                {/* Decorative Frame */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-neutral-900"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-neutral-900"
                />

                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="absolute -right-8 top-1/2 -translate-y-1/2 bg-neutral-900 text-white p-8 max-w-[200px] shadow-2xl hidden lg:block"
                >
                  <Award className="h-10 w-10 mb-4" />
                  <p className="text-xs tracking-[0.2em] uppercase font-light leading-relaxed">
                    Indian Haute Couture Excellence
                  </p>
                </motion.div>
              </div>

              {/* Small Accent Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute -bottom-12 -left-12 w-48 h-48 hidden lg:block"
              >
                <img
                  src="/images/dresses/dress-20.jpeg"
                  alt="Detail"
                  className="h-full w-full object-cover shadow-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-neutral-400"
          >
            <div className="h-12 w-[1px] bg-neutral-300" />
            <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden bg-white">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  className="h-px bg-neutral-300"
                />
                <h2 className="font-serif text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-tight">
                  Our Story
                </h2>
              </div>

              <div className="space-y-6 text-neutral-700 text-lg font-light leading-relaxed">
                <p>
                  At Westelle, we believe that fashion is more than fabric — it's a <span className="italic text-neutral-900 font-normal">feeling</span>. Born from the idea of blending timeless grace with modern artistry, Westelle was created to celebrate the strength, confidence, and elegance of every woman.
                </p>
                <p>
                  Each collection is a reflection of sophistication, crafted for those who find beauty in simplicity and power in subtlety.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: "2020", label: "Founded" },
                  { number: "5000+", label: "Creations" },
                  { number: "50+", label: "Countries" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <p className="font-serif text-3xl text-neutral-900 mb-2">{stat.number}</p>
                    <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-[3/4] overflow-hidden"
                >
                  <img
                    src="/images/dresses/dress-20.jpeg"
                    alt="Westelle Craftsmanship"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-[3/4] overflow-hidden mt-12"
                >
                  <img
                    src="/images/dresses/dress-25.jpeg"
                    alt="Westelle Design"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-32 lg:py-40 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-12"
          >
            <div className="space-y-8">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-4"
              >
                <div className="h-px w-12 bg-neutral-300"></div>
                <Sparkles className="h-6 w-6 text-neutral-400" />
                <div className="h-px w-12 bg-neutral-300"></div>
              </motion.div>
              
              <h2 className="font-serif text-5xl lg:text-6xl tracking-tight leading-tight text-neutral-900">
                Our Philosophy
              </h2>
            </div>

            <p className="text-2xl lg:text-3xl font-light leading-relaxed text-neutral-700 max-w-3xl mx-auto">
              Luxury lies in the details — the delicate drape of silk, the whisper of chiffon, the poise of minimal design.
            </p>

            <div className="grid md:grid-cols-3 gap-12 pt-16">
              {[
                { title: "Premium Materials", desc: "Fabrics selected with care from the finest mills" },
                { title: "Meticulous Detail", desc: "Attention to every stitch and seam" },
                { title: "Timeless Design", desc: "Pieces that transcend seasonal trends" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="h-px w-12 bg-neutral-300 mx-auto"></div>
                  <h3 className="text-lg tracking-[0.2em] uppercase font-light text-neutral-900">{item.title}</h3>
                  <p className="text-neutral-600 text-sm font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="relative py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Images */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-[3/4] overflow-hidden"
                >
                  <img
                    src="/images/dresses/dress-34.jpeg"
                    alt="Westelle Craftsmanship Detail"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-[3/4] overflow-hidden mt-12"
                >
                  <img
                    src="/images/dresses/dress-35.jpeg"
                    alt="Westelle Atelier"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-neutral-900 text-white p-6 max-w-[180px]"
              >
                <Award className="h-8 w-8 mb-3" />
                <p className="text-xs tracking-[0.15em] uppercase font-light">Handcrafted Excellence</p>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  className="h-px bg-neutral-300"
                />
                <h2 className="font-serif text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-tight">
                  Craftsmanship
                </h2>
              </div>

              <div className="space-y-6 text-neutral-700 text-lg font-light leading-relaxed">
                <p>
                  Every Westelle piece is a testament to the art of couture. Our skilled artisans bring decades of experience, transforming premium fabrics into wearable masterpieces through time-honored techniques and unwavering attention to detail.
                </p>
                <p>
                  From the first sketch to the final stitch, each garment undergoes meticulous quality checks. We believe in slow fashion — creating pieces that are built to last, designed to be cherished for years to come.
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-6 pt-8">
                {[
                  { step: "01", title: "Design & Pattern", desc: "Each design begins with careful sketching and precise pattern making" },
                  { step: "02", title: "Fabric Selection", desc: "Premium materials sourced from renowned textile houses worldwide" },
                  { step: "03", title: "Expert Tailoring", desc: "Master craftspeople bring each piece to life with precision" },
                  { step: "04", title: "Quality Assurance", desc: "Rigorous inspection ensures every detail meets our standards" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0">
                      <span className="font-serif text-2xl text-neutral-300 group-hover:text-neutral-900 transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base tracking-[0.15em] uppercase font-light text-neutral-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-neutral-600 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Size Guide Section */}
      <section className="relative py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-4">
                <div className="h-px w-12 bg-neutral-300"></div>
                <Award className="h-6 w-6 text-neutral-400" />
                <div className="h-px w-12 bg-neutral-300"></div>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl text-neutral-900 tracking-tight">
                Size Guide
              </h2>
              <p className="text-neutral-600 font-light text-lg max-w-2xl mx-auto">
                Find your perfect fit. All measurements are in centimeters.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-8 lg:p-12"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-300">
                      <th className="text-left py-4 px-6 text-sm tracking-[0.2em] uppercase font-light text-neutral-900">Size</th>
                      <th className="text-left py-4 px-6 text-sm tracking-[0.2em] uppercase font-light text-neutral-900">Bust</th>
                      <th className="text-left py-4 px-6 text-sm tracking-[0.2em] uppercase font-light text-neutral-900">Waist</th>
                      <th className="text-left py-4 px-6 text-sm tracking-[0.2em] uppercase font-light text-neutral-900">Hips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuide.measurements.map((item, i) => (
                      <motion.tr 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-neutral-200 hover:bg-white transition-colors"
                      >
                        <td className="py-4 px-6 font-light text-neutral-900">{item.size}</td>
                        <td className="py-4 px-6 font-light text-neutral-700">{item.bust} cm</td>
                        <td className="py-4 px-6 font-light text-neutral-700">{item.waist} cm</td>
                        <td className="py-4 px-6 font-light text-neutral-700">{item.hips} cm</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  <span className="font-normal text-neutral-900">Measurement Tips:</span> Measure around the fullest part of your bust, the narrowest part of your waist, and the fullest part of your hips. For the most accurate fit, we recommend having someone assist you with measurements.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 lg:py-40 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-4">
                <div className="h-px w-12 bg-neutral-300"></div>
                <Sparkles className="h-6 w-6 text-neutral-400" />
                <div className="h-px w-12 bg-neutral-300"></div>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl text-neutral-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white border border-neutral-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 lg:p-8 text-left hover:bg-neutral-50 transition-colors group"
                  >
                    <span className="text-lg font-light text-neutral-900 pr-8 group-hover:text-neutral-600 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === i ? 'auto' : 0,
                      opacity: openFaq === i ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                      <p className="text-neutral-600 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-4">
                <div className="h-px w-12 bg-neutral-300"></div>
                <Heart className="h-6 w-6 text-neutral-400" />
                <div className="h-px w-12 bg-neutral-300"></div>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl text-neutral-900 tracking-tight">
                Get in Touch
              </h2>
              <p className="text-neutral-600 font-light text-lg max-w-2xl mx-auto">
                We're here to help with any questions about our collections, sizing, or custom orders.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  detail: "hello@westelle.com",
                  subdDetail: "Response within 24 hours"
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  detail: "+91 98765 43210",
                  subdDetail: "Mon-Sat, 10am-7pm IST"
                },
                {
                  icon: MapPin,
                  title: "Visit Our Atelier",
                  detail: "Mumbai, India",
                  subdDetail: "By appointment only"
                }
              ].map((contact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-neutral-50 p-8 text-center group hover:bg-neutral-900 transition-all duration-500"
                >
                  <contact.icon className="h-10 w-10 mx-auto mb-6 text-neutral-900 group-hover:text-white transition-colors" />
                  <h3 className="text-sm tracking-[0.2em] uppercase font-light text-neutral-900 group-hover:text-white mb-3 transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-lg font-light text-neutral-900 group-hover:text-white mb-2 transition-colors">
                    {contact.detail}
                  </p>
                  <p className="text-xs text-neutral-500 group-hover:text-white/60 font-light transition-colors">
                    {contact.subdDetail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-50 py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h3 className="font-serif text-5xl text-neutral-900">Experience Westelle</h3>
            <p className="text-neutral-600 text-lg font-light max-w-2xl mx-auto">
              Discover our curated collection of timeless pieces crafted with passion and precision
            </p>
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-neutral-900 text-white px-16 py-6 text-xs tracking-[0.3em] uppercase font-light hover:bg-neutral-800 transition-all duration-300"
            >
              View Collection
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}