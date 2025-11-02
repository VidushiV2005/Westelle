import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1.5, 0.7]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -280]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const visible = v >= 0.2;
      window.dispatchEvent(new CustomEvent("westelle:brand-visible", { detail: visible }));
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="relative h-[100vh] w-full">
      <img
        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2400&auto=format&fit=crop"
        alt="Westelle Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex h-full items-center justify-center pointer-events-none">
        <motion.h1
          style={{ scale, y, opacity }}
          transition={{ ease: "easeOut" }}
          className="will-change-transform font-serif text-6xl tracking-[0.2em] text-white md:text-7xl"
        >
          Westelle
        </motion.h1>
      </div>
    </section>
  );
}
