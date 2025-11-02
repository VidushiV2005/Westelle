import { motion } from "framer-motion";

export default function ClosingBrand() {
  return (
    <section className="relative h-[90vh] w-full bg-black">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-6xl tracking-[0.25em] text-white"
        >
          Westelle
        </motion.h2>
      </div>
    </section>
  );
}
