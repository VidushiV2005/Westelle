import { motion } from "framer-motion";

export default function Lookbook() {
  const images = [
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  ];

  return (
    <section className="py-20">
      <div className="container-padded">
        <h2 className="mb-10 text-center font-serif text-3xl">Lookbook</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {images.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt="Lookbook"
              className="h-72 w-full rounded-lg object-cover"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            />
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-neutral-700">
            Tailored silhouettes. Refined textures. A study in quiet luxury.
          </p>
        </div>
      </div>
    </section>
  );
}
