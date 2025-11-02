export default function Footer() {
  const shopLinks = [
    { name: "New Arrivals", href: "/shop" },
    { name: "Evening Wear", href: "/shop" },
    { name: "Ball Gowns", href: "/shop" },
    { name: "Cocktail Dresses", href: "/shop" }
  ];

  const aboutLinks = [
    { name: "Our Story", href: "/about" },
    { name: "Atelier", href: "/about" },
    { name: "Craftsmanship", href: "/about" },
   
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/about" },
    { name: "Size Guide", href: "/about" },
    { name: "FAQ", href: "/about" }
  ];

  return (
    <footer className="bg-neutral-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <a href="/">
                <h3 className="font-serif text-3xl tracking-wide mb-6 cursor-pointer hover:text-neutral-300 transition-colors">WESTELLE</h3>
              </a>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Indian haute couture for the modern woman. Timeless elegance, crafted to perfection.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-sm tracking-[0.3em] uppercase mb-6 text-neutral-300">Shop</h4>
              <ul className="space-y-3">
                {shopLinks.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-sm tracking-[0.3em] uppercase mb-6 text-neutral-300">About</h4>
              <ul className="space-y-3">
                {aboutLinks.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm tracking-[0.3em] uppercase mb-6 text-neutral-300">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
    </footer>
  );
}