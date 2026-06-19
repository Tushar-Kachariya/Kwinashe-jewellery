'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";



export default function MegaMenu({
    item,
    apiData,
    apiShape,
    loading,
    slug,
    onLinkClick
}) {

    const searchParams = useSearchParams();
    const selectedMenu =
        apiData?.find(cat => cat.name === item?.name)
    // console.log("apiData==========>", selectedMenu)

    if (!selectedMenu && !loading) return null

    return (

        <div className="mega-menu w-full overflow-x-hidden box-border !p-2 sm:!p-4 md:!p-8 md:max-h-[80vh] md:overflow-y-auto !shadow-none md:!shadow-xl !border-none md:!border-t md:!border-[#f0f0f0] !bg-transparent md:!bg-white">

            <div className="mega-inner hidden md:grid">

                {/* CATEGORY */}
                <div className="mega-col">

                    <h4>

                        {loading
                            ? <div className="skeleton-title" />
                            : selectedMenu?.name}

                    </h4>

                    <div className="mega-links grid-cols-2">

                        {loading ? (

                            [...Array(6)].map((_, index) => (

                                <div
                                    key={index}
                                    className="mega-link-skeleton"
                                />

                            ))

                        ) : (

                            selectedMenu?.subcategory
                                ?.map(sub => (

                                    <div
                                        key={sub.id}
                                        className="mega-link"
                                    >

                                        <Link
                                            key={sub.id}
                                            href={{
                                                pathname: `/${slug}`,
                                                query: {
                                                    ...Object.fromEntries(searchParams.entries()),
                                                    subcategory_slug: sub.slug
                                                }
                                            }}
                                            onClick={onLinkClick}
                                        >
                                            {sub.name}
                                        </Link>
                                    </div>

                                ))

                        )}

                    </div>

                </div>

                {/* SHAPE */}
                <div className="mega-col">

                    <h4>Shop by Shape</h4>

                    <div className="mega-links">

                        {loading ? (

                            [...Array(8)].map((_, index) => (

                                <div
                                    key={index}
                                    className="shape-skeleton"
                                >

                                    <div className="shape-img-skeleton" />

                                    <div className="shape-text-skeleton" />

                                </div>

                            ))

                        ) : (

                            apiShape?.data?.Shape &&

                            apiShape.data.Shape
                                ?.map(shape => (
                                    <Link
                                        key={shape.id}
                                        href={{
                                            pathname: `/${slug}`,
                                            query: {
                                                ...Object.fromEntries(searchParams.entries()),
                                                diamond_type: shape.slug
                                            }
                                        }}
                                        onClick={onLinkClick}
                                        className="mega-link flex items-center gap-3 group"
                                    >
                                        <div className="w-[38px] h-[38px] flex items-center justify-center">
                                            {shape.image && !shape.image.includes('default.png') ? (
                                                <img
                                                    src={shape.image}
                                                    alt={shape.name}
                                                    className="w-full h-full object-contain filter grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                                />
                                            ) : (
                                                <svg className="w-8 h-8 text-gray-400 group-hover:text-gold transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M12 2L2 12l10 10 10-10L12 2z" />
                                                </svg>
                                            )}
                                        </div>

                                        <span className="text-[11px] text-[#475569] group-hover:text-[#c9a84c] tracking-[0.08em] font-medium uppercase transition-colors duration-300">
                                            {shape.name}
                                        </span>

                                    </Link>
                                ))

                        )}

                    </div>

                </div>

                {/* INFO / METAL */}
                <div className="mega-col">

                    <h4>Shop by Metal Type</h4>

                    <div className="mega-links">

                        {loading ? (

                            [...Array(8)].map((_, index) => (

                                <div
                                    key={index}
                                    className="mega-link-skeleton"
                                />

                            ))

                        ) : (

                            Array.isArray(apiShape?.data?.Metal_Type) &&

                            apiShape.data.Metal_Type
                                ?.map(type => (
                                    <Link
                                        key={type.id}
                                        href={{
                                            pathname: `/${slug}`,
                                            query: {
                                                ...Object.fromEntries(searchParams.entries()),
                                                metal_type: type.slug
                                            }
                                        }}
                                        onClick={onLinkClick}
                                        className="mega-link group"
                                    >
                                        <span className="text-[11px] text-[#475569] group-hover:text-[#c9a84c] tracking-[0.08em] font-medium uppercase transition-colors duration-300">
                                            {type.name}
                                        </span>
                                    </Link>
                                ))

                        )}

                    </div>

                </div>

                {/* IMAGE */}
                <div className="mega-col hidden md:block">

                    {loading ? (

                        <div className="w-full h-[240px] bg-gray-100 rounded-md animate-pulse" />

                    ) : (
                        <div className="relative w-full h-[240px] rounded-md overflow-hidden group cursor-pointer shadow-sm">
                            <img 
                                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop" 
                                alt="Luxury Jewelry Collection" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                            
                            <div className="absolute bottom-4 left-0 w-full">
                                <Link 
                                    href={`/${slug}`} 
                                    onClick={onLinkClick}
                                    className="block w-full py-3 text-center bg-[#c9a84c] hover:bg-[#b5953e] text-white text-[12px] font-bold tracking-[0.15em] uppercase transition-colors duration-300"
                                >
                                    Explore Collection
                                </Link>
                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>

    )
}