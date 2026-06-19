"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../../../api/axios";
import ProductCard from "../../../../app/[catagory]/Components/ProductCard";

/* ─── SVG Icons ─── */

const ShippingIcon = () => (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#1B2A4A]" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M18 10c-3-3-6 0-3 3 3 3 7 3 7 3s0-4-3-7c-3-3-6 0-3 3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 16v6" strokeLinecap="round" />
        <rect x="8" y="22" width="32" height="22" rx="1" />
        <path d="M40 28h10l6 7v9H40V28z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="49" r="5" />
        <circle cx="46" cy="49" r="5" />
    </svg>
);

const CertifiedIcon = () => (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#1B2A4A]" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 46c5 0 9-3 12-6h12c3 0 5-2 5-5s-2-5-5-5H24" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 40c0-6 4-10 10-10h4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 10l12 3v12c0 7-5 13-12 16-7-3-12-9-12-16V13l12-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 23l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
);

const CraftsmanshipIcon = () => (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#1B2A4A]" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M38 16L54 24v16L38 48 22 40V24L38 16z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 16v16M22 24l16 8 16-8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 22h10M10 32h8M4 42h10" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
);

const LuxuryIcon = () => (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#1B2A4A]" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="22" y="22" width="20" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 28h20" strokeLinecap="round" />
        <path d="M32 8A24 24 0 0 1 56 32a24 24 0 0 1-5.5 15.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 13.5A24 24 0 0 1 32 8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 32a24 24 0 0 1 5.5-15.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50.5 50.5A24 24 0 0 1 32 56a24 24 0 0 1-20-10.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 52v-6.5h6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M52 12v6.5h-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function RecommendedJewelleryList({ currentSlug }) {
    const scrollRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRecommended = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/recommendedJewelleryList/${currentSlug}`);
                setProducts(res?.data?.matching_items);

                // console.log('data=======>',res?.data?.matching_items)
            } catch (err) {
                console.error("Error fetching recommended products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommended();
    }, [ currentSlug]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const amount = 300;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <>
            {/* ── Trust Badges Section ── */}
            <section className="w-full bg-[#EEF4F8] py-16 flex justify-center border-b border-[#e8e5dd]/60">
                <div className="w-full max-w-[1180px] px-6 md:px-12 !pb-10">
                    <div className="text-center mb-20">
                        <h2
                            className="text-[32px] md:text-[36px] text-[#1B2A4A] mb-2 tracking-tight !pb-8 !pt-10"
                            style={{ fontFamily: "var(--font-playfair), 'Georgia', serif", fontWeight: "400" }}
                        >
                            Certified. Guaranteed. Delivered.
                        </h2>
                        <div className="w-full flex justify-center">
                            <p
                                className="text-[15px] !pb-5 text-[#475569] max-w-2xl leading-relaxed text-center"
                                style={{
                                    fontFamily: "var(--font-inter), sans-serif",
                                    fontWeight: "300",
                                }}
                            >
                                Every Kwinashe piece comes with our full promise — so you can shop with complete confidence.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
                        {/* Free Shipping */}
                        <div className="flex flex-col items-center text-center px-2">
                            <div className="w-12 h-12 mb-3 flex items-center justify-center text-[#1B2A4A]">
                                <ShippingIcon />
                            </div>
                            <h3
                                className="text-[18px] text-[#1B2A4A] mb-1"
                                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: "500" }}
                            >
                                Free Shipping
                            </h3>
                            <p
                                className="text-[13.5px] text-[#475569] leading-[1.6] max-w-[240px]"
                                style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: "300" }}
                            >
                                Complimentary shipping on all US orders, tracked from our studio to your door.
                            </p>
                        </div>

                        {/* Certified Diamonds */}
                        <div className="flex flex-col items-center text-center px-2">
                            <div className="w-12 h-12 mb-3 flex items-center justify-center text-[#1B2A4A]">
                                <CertifiedIcon />
                            </div>
                            <h3
                                className="text-[18px] text-[#1B2A4A] mb-1"
                                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: "500" }}
                            >
                                Certified Diamonds
                            </h3>
                            <p
                                className="text-[13.5px] text-[#475569] leading-[1.6] max-w-[240px]"
                                style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: "300" }}
                            >
                                Every stone is IGI or GIA certified — graded for cut, clarity, color, and brilliance.
                            </p>
                        </div>

                        {/* Expert Craftsmanship */}
                        <div className="flex flex-col items-center text-center px-2">
                            <div className="w-12 h-12 mb-3 flex items-center justify-center text-[#1B2A4A]">
                                <CraftsmanshipIcon />
                            </div>
                            <h3
                                className="text-[18px] text-[#1B2A4A] mb-1"
                                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: "500" }}
                            >
                                Expert Craftsmanship
                            </h3>
                            <p
                                className="text-[13.5px] text-[#475569] leading-[1.6] max-w-[240px]"
                                style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: "300" }}
                            >
                                Precision-set by skilled artisans with generations of diamond expertise.
                            </p>
                        </div>

                        {/* Responsible Luxury */}
                        <div className="flex flex-col items-center text-center px-2">
                            <div className="w-12 h-12 mb-3 flex items-center justify-center text-[#1B2A4A]">
                                <LuxuryIcon />
                            </div>
                            <h3
                                className="text-[18px] text-[#1B2A4A] mb-1"
                                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: "500" }}
                            >
                                Responsible Luxury
                            </h3>
                            <p
                                className="text-[13.5px] text-[#475569] leading-[1.6] max-w-[240px]"
                                style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: "300" }}
                            >
                                Lab-grown, conflict-free, and carbon-conscious. Beautiful diamonds with a clear conscience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Recommended Products List ── */}
            {(!loading && products.length === 0) ? null : (
                <section className="w-full bg-[#FAFAF8] section-pad overflow-hidden">
                    <div className="container-lux">
                        {/* Heading */}
                        <div className="text-center mb-12 px-4">
                            <h2
                                className="text-3xl md:text-4xl text-[#1B2A4A] !pb-5"
                                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: "300" }}
                            >
                                You May Also Like
                            </h2>
                        </div>

                        {/* Carousel wrapper */}
                        <div className="relative w-full !mb-10 !mt-5 max-w-full">
                            {/* Left arrow */}
                            {products.length > 4 && (
                                <button
                                    onClick={() => scroll("left")}
                                    aria-label="Scroll left"
                                    className="absolute left-2 lg:-left-6 top-[140px] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 border border-[#E5E7EB]"
                                >
                                    <ChevronLeft className="w-6 h-6 text-[#1F1F1F]" />
                                </button>
                            )}

                            {/* Scrollable list */}
                            <div
                                ref={scrollRef}
                                className={`w-full flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide pt-4 pb-12 px-4 lg:px-6 ${products.length <= 4 ? "justify-center" : "justify-start"
                                    }`}
                                style={{ scrollbarWidth: "none", minHeight: "440px" }}
                            >
                                {loading
                                    ? [...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="min-w-[280px] w-[280px] flex-shrink-0 bg-white rounded-[16px] p-5 pb-6 animate-pulse shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                                        >
                                            <div className="w-full h-[280px] bg-gray-100 rounded-lg mb-4" />
                                            <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
                                            <div className="h-5 bg-gray-100 rounded w-1/3" />
                                        </div>
                                    ))
                                    : products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="min-w-[200px] sm:min-w-[240px] w-[200px] sm:w-[240px] flex-shrink-0"
                                        >
                                            <ProductCard
                                                product={product}
                                                className="recommended-card w-full"
                                            />
                                        </div>
                                    ))}
                            </div>

                            {/* Right arrow */}
                            {products.length > 4 && (
                                <button
                                    onClick={() => scroll("right")}
                                    aria-label="Scroll right"
                                    className="absolute right-2 lg:-right-6 top-[140px] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 border border-[#E5E7EB]"
                                >
                                    <ChevronRight className="w-6 h-6 text-[#1F1F1F]" />
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}