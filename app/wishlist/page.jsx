"use client";

import { useState } from "react";

const initialWishlist = [
  {
    id: 1,
    name: "10K White Gold Lab Grown Diamond Solitaire Rings",
    weight: "1.50CT",
    totalWeight: "1.69CT",
    price: "$602.64",
    image: "https://placehold.co/280x260/f8f8f8/cccccc?text=Ring+1",
  },
  {
    id: 2,
    name: "10K Rose Gold Lab Grown Diamond Engagement Ring",
    weight: "0.50CT",
    totalWeight: "0.50CT",
    price: "$319.10",
    image: "https://placehold.co/280x260/f8f8f8/cccccc?text=Ring+2",
  },
  {
    id: 3,
    name: "10K Yellow Gold Lab Grown Diamond Hoops Earrings",
    weight: "0.65CT",
    totalWeight: "0.65CT",
    price: "$245.00",
    image: "https://placehold.co/280x260/f8f8f8/cccccc?text=Earrings",
  },
  {
    id: 4,
    name: "10K Rose Gold Lab Grown Diamond Engagement Ring",
    weight: "1.50CT",
    totalWeight: "1.52CT",
    price: "$458.40",
    image: "https://placehold.co/280x260/f8f8f8/cccccc?text=Ring+4",
  },
];

const guarantees = [
  {
    icon: <ShippingIcon />,
    title: "Free Shipping",
    desc: "Prompt delivery at no extra cost.",
  },
  {
    icon: <CertifiedIcon />,
    title: "Certified Diamonds",
    desc: "Lab-grown diamonds, certified for clarity and brilliance.",
  },
  {
    icon: <CraftsmanshipIcon />,
    title: "Expert Craftsmanship",
    desc: "Precision and care in every piece.",
  },
  {
    icon: <LuxuryIcon />,
    title: "Responsible Luxury",
    desc: "Elegance crafted with conscience.",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [cart, setCart] = useState([]);

  function handleRemove(id) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCart(id) {
    const item = wishlist.find((i) => i.id === id);
    if (item && !cart.includes(id)) {
      setCart((prev) => [...prev, id]);
      alert(`"${item.name}" added to cart!`);
    } else {
      alert("Item already in cart.");
    }
  }

  return (
    <div className="min-h-screen! bg-[#f7f7f7]! font-sans! antialiased!">

      {/* ── Header Banner ── */}
      <div className="w-full! text-center! py-10! bg-[#f7f7f7]!">
        <h1 className="text-4xl! font-light! text-gray-800! tracking-wide!">Wishlist</h1>
        <p className="text-sm! text-gray-500! mt-3! max-w-xl! mx-auto! leading-relaxed!">
          The pieces you love deserve a home. Curate your Kwinashe wishlist and let your dream jewelry find its place
        </p>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-7xl! mx-auto! px-6! md:px-10! py-10!">
        {wishlist.length === 0 ? (
          <div className="text-center! py-24! text-gray-400! text-lg!">
            Your wishlist is empty.
          </div>
        ) : (
          <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-6!">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white! rounded-lg! shadow-sm! border! border-gray-100! flex! flex-col! overflow-hidden!"
              >
                {/* CART | REMOVE */}
                <div className="flex! items-center! justify-center! gap-3! pt-5! pb-2! px-4!">
                  <button
                    onClick={() => handleCart(item.id)}
                    className="text-xs! font-semibold! text-gray-700! underline! underline-offset-2! tracking-widest! hover:text-black! transition-colors! uppercase!"
                  >
                    CART
                  </button>
                  <span className="text-gray-300! text-sm!">|</span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-xs! font-semibold! text-gray-700! underline! underline-offset-2! tracking-widest! hover:text-red-500! transition-colors! uppercase!"
                  >
                    REMOVE
                  </button>
                </div>

                {/* Product Image */}
                <div className="flex! items-center! justify-center! px-6! py-6! bg-white! min-h-[220px]!">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-[200px]! w-auto! object-contain!"
                  />
                </div>

                {/* Product Info */}
                <div className="px-5! pb-5! pt-3! flex! flex-col! gap-1.5! border-t! border-gray-100!">
                  <p className="text-sm! text-gray-800! font-normal! leading-snug!">
                    {item.name} {item.weight}
                  </p>
                  <p className="text-xs! text-gray-500!">
                    Total Weight : <span className="font-semibold! text-gray-700!">{item.totalWeight}</span>
                  </p>
                  <p className="text-xs! text-gray-500!">
                    Price : <span className="text-base! font-bold! text-gray-900!">{item.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Guarantee Section ── */}
      <div className="w-full! bg-white! mt-10! py-16! px-6!">
        <h2 className="text-center! text-3xl! font-bold! text-[#0f1d3e]! mb-12! tracking-tight!">
          Yes, That&apos;s Guaranteed.
        </h2>
        <div className="max-w-5xl! mx-auto! grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-10!">
          {guarantees.map((g, i) => (
            <div key={i} className="flex! flex-col! items-center! text-center! gap-4!">
              <div className="text-gray-500! w-14! h-14! flex! items-center! justify-center!">
                {g.icon}
              </div>
              <p className="text-base! font-semibold! text-[#0f1d3e]!">{g.title}</p>
              <p className="text-sm! text-gray-500! leading-relaxed!">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed! bottom-6! right-6! w-12! h-12! bg-[#25d366]! hover:bg-[#20ba5a]! hover:scale-105! rounded-full! flex! items-center! justify-center! shadow-lg! transition-all! duration-200! z-50!"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

/* ─── SVG Icons ─── */

function ShippingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12! h-12!" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 64 64">
      <rect x="4" y="18" width="38" height="26" rx="2" />
      <path d="M42 26h10l6 8v10H42V26z" />
      <circle cx="16" cy="48" r="4" />
      <circle cx="50" cy="48" r="4" />
      <path d="M4 38h38M42 32h12" />
    </svg>
  );
}

function CertifiedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12! h-12!" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 64 64">
      <path d="M32 6 L38 18 L52 20 L42 30 L44 44 L32 38 L20 44 L22 30 L12 20 L26 18 Z" />
      <path d="M24 32 l6 6 10-12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 52 Q32 60 44 52" strokeLinecap="round" />
    </svg>
  );
}

function CraftsmanshipIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12! h-12!" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 64 64">
      <rect x="10" y="24" width="34" height="28" rx="2" />
      <path d="M18 24 V16 a14 14 0 0 1 28 0 v8" />
      <path d="M4 34 h6M54 34 h6" strokeLinecap="round" />
      <circle cx="27" cy="38" r="3" />
      <line x1="27" y1="41" x2="27" y2="46" strokeLinecap="round" />
    </svg>
  );
}

function LuxuryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12! h-12!" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="22" />
      <path d="M32 10 a22 22 0 0 1 0 44" strokeDasharray="4 3" />
      <path d="M20 32 l8 8 16-16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 18 q4-4 6 0" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="w-6! h-6!" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}