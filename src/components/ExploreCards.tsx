import { motion } from "framer-motion";

const categories: { title: string; image: string }[] = [
  { title: "Evening Gowns", image: "https://images.unsplash.com/photo-1544441892-0152e05d44e2?q=80&w=1600&auto=format&fit=crop" },
  { title: "Summer Collection", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop" },
  { title: "Party Wear", image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop" },
  { title: "Premium Sarees", image: "https://images.unsplash.com/photo-1589308078056-f04f3baf3401?q=80&w=1600&auto=format&fit=crop" },
  { title: "Designer Lehengas", image: "https://images.unsplash.com/photo-1591154466575-7f5f86fc74a0?q=80&w=1600&auto=format&fit=crop" },
  { title: "Formal Dresses", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop" },
];

export default function ExploreCards() {
  return (
    <section className="container-padded py-20">
      <h2 className="mb-10 text-center font-serif text-3xl">Explore</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative h-56 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
          >
            <motion.img
              src={c.image}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="relative z-10 flex h-full items-end p-4">
              <div className="text-white">
                <div className="font-serif text-lg">{c.title}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
