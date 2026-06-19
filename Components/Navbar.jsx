"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"

import Logo from "../Components/Logo"
import HeaderIcons from "../Components/HeaderIcons"
import MegaMenu from "../Components/MegaMenu"

import api from "../api/axios"
import { UserSVG, HeartSVG, CartSVG } from "../icons/icons"

export default function Navbar() {

  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const [apiData, setApiData] = useState([])
  const [shapeData, setShapeData] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const closeTimer = useRef(null)

  const handleMenuEnter = (menu) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
    clearTimeout(closeTimer.current)
    setActiveMenu(menu)
  }

  const handleMenuLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null)
    }, 120)
  }

  useEffect(() => {
  }, [])

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true)

        const [categoryRes, shapeRes] = await Promise.all([
          api.post("/category"),
          api.get("/Jewellery-filter")
        ])

        setApiData(categoryRes.data.data)
        setShapeData(shapeRes.data)

      } catch (err) {

        setError(err.message)
        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    fetchData()

  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (mobileNavOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.touchAction = 'none';
      } else {
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.touchAction = '';
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.touchAction = '';
      }
    };
  }, [mobileNavOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileNavOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredMenus = apiData?.filter(
    menu => menu.ismenu === "Active" && menu.ishome === "Active" && menu.iscustom === "Active"
  ) || []

  return (
    <>
      <header className="header w-full box-border">

        <div className="header-top">

          <button
            type="button"
            className={`nav-toggle ${mobileNavOpen ? 'open' : ''}`}
            aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileNavOpen}
            aria-controls="site-navigation"
            onClick={() => setMobileNavOpen(v => !v)}
          >
            <span />
          </button>

          <Link href="/" className="header-logo-link">
            <Logo />
          </Link>

          {/* Search Bar in the middle white space */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 lg:mx-16 relative items-center">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search here..."
              className="w-full h-11 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 text-sm bg-gray-50 transition-colors box-border"
              style={{ paddingLeft: '40px', paddingRight: '20px' }}
            />
          </div>

          <div className="header-top-right">

            <HeaderIcons />

          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <div className="!px-2 !py-1 pt-1 !pb-3.5 md:hidden bg-white border-b border-gray-200">
          <div className="relative flex items-center w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search here..."
              className="w-full h-10 rounded-full border border-gray-200 focus:outline-none focus:border-gold text-[13px] bg-white transition-colors box-border"
              style={{ paddingLeft: '42px', paddingRight: '20px' }}
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          id="site-navigation-desktop"
          className="hidden md:flex nav"
        >
          {loading ? (

            [...Array(8)].map((_, i) => (
              <div key={i} className="nav-skeleton" />
            ))

          ) : (

            filteredMenus.map(menu => (
              <Link
                href={`/${menu.slug}`}
                key={menu.id}
                className="nav-item flex items-center"
                data-active={activeMenu?.name === menu.name ? "true" : "false"}
                onMouseEnter={() => handleMenuEnter(menu)}
                onMouseLeave={handleMenuLeave}
              >
                {menu.name}
              </Link>
            ))

          )}
        </nav>

        {/* Desktop Mega Menu Dropdown */}
        {activeMenu && (
          <div
            className=" mega-menu-outer hidden md:block absolute top-full left-0 w-full z-50 bg-white border-t border-gray-100 shadow-xl"
            onMouseEnter={() => clearTimeout(closeTimer.current)}
            onMouseLeave={handleMenuLeave}
          >
            <MegaMenu
              item={activeMenu}
              apiData={apiData}
              apiShape={shapeData}
              loading={loading}
              slug={activeMenu?.slug}
            />
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[4px] z-[9998] md:hidden transition-opacity duration-300 ${mobileNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileNavOpen(false)}
      />

      {/* Mobile Slide-Out Drawer */}
      <div
        className={`fixed top-0 left-0 w-[80%] max-w-[360px] h-screen bg-white z-[9999] transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col shadow-2xl overscroll-behavior-y-contain ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 min-h-[58px] box-border">
          <button onClick={() => setMobileNavOpen(false)} aria-label="Close menu" className="!p-4 -ml-1 text-gray-800 hover:text-gold transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="flex-1 flex justify-center !pr-5.5 scale-90">
            <Logo />
          </div>

        </div>



        {/* Drawer Scrollable Content */}
        <div className=" !pl-5 flex-1 overflow-y-auto scrollbar-thin select-none border-t border-gray-100">



          {/* Drawer Menu Items */}
          {loading ? (
            <div className="px-6 py-6 space-y-6">
              {[...Array(6)].map((_, i) => <div key={i} className="h-5 bg-gray-100 rounded animate-pulse" />)}
            </div>
          ) : (
            <div className="flex flex-col py-2">
              {filteredMenus.map(menu => {
                const isExpanded = activeMenu?.name === menu.name;
                return (
                  <div key={menu.id} className="transition-all duration-300 border-b border-gray-50 last:border-b-0">
                    <div className="flex justify-between items-center px-6 py-3.5 hover:bg-gray-50/50 transition-colors duration-200">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          if (isExpanded) setActiveMenu(null);
                          else setActiveMenu(menu);
                        }}
                        className="flex-1 text-[13px] font-semibold tracking-[0.08em] text-gray-800 uppercase hover:text-gold transition-colors duration-200"
                      >
                        <Link
                          href={`/${menu.slug}`}
                        // onClick={() => setMobileNavOpen(false)}

                        >
                          {menu.name}
                        </Link>

                      </div>
                      <button
                        className="p-3 -mr-3 text-gray-400 hover:text-gold transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                          if (isExpanded) setActiveMenu(null);
                          else setActiveMenu(menu);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-gold' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </button>
                    </div>

                    {/* Submenu Accordion Container */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: isExpanded ? '1200px' : '0px' }}
                    >
                      <div className=" !pl-4 border-t border-b border-gray-100 py-4 px-6 flex flex-col gap-4">

                        {/* See All link */}
                        <Link
                          href={`/${menu.slug}`}
                          onClick={() => setMobileNavOpen(false)}
                          className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-800 underline decoration-gray-400 underline-offset-4 hover:text-gold transition-colors block pl-1"
                        >
                          See All {menu.name}
                        </Link>

                        {/* Shop by Style Section */}
                        <div className="flex flex-col !pl-3  gap-2">
                          <div className="text-[10px] font-bold tracking-[0.12em] text-gray-400 uppercase pl-1">
                            Shop by Style
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pl-1">
                            {(() => {
                              const uniqueSubs = [];
                              const seenSlugs = new Set();
                              menu.subcategory?.forEach(sub => {
                                if (sub?.slug && !seenSlugs.has(sub.slug)) {
                                  seenSlugs.add(sub.slug);
                                  uniqueSubs.push(sub);
                                }
                              });
                              return uniqueSubs.map(sub => (
                                <Link
                                  key={sub.id}
                                  href={`/${menu.slug}?subcategory_slug=${sub.slug}`}
                                  onClick={() => setMobileNavOpen(false)}
                                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f172a] hover:text-gold transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ));
                            })()}
                          </div>
                        </div>

                        {/* Shop by Shape Section */}
                        {shapeData?.data?.Shape && shapeData.data.Shape.length > 0 && (
                          <div className="flex flex-col  gap-2">
                            <div className="text-[10px] font-bold tracking-[0.12em] text-gray-400 uppercase pl-1">
                              Shop by Shape
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pl-1 !pl-3">
                              {shapeData.data.Shape.map(shape => (
                                <Link
                                  key={shape.id}
                                  href={`/${menu.slug}?diamond_type=${shape.slug}`}
                                  onClick={() => setMobileNavOpen(false)}
                                  className="group flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f172a] hover:text-gold transition-colors"
                                >
                                  {shape.image && !shape.image.includes('default.png') ? (
                                    <img
                                      src={shape.image}
                                      alt={shape.name}
                                      className="w-6 h-6 object-contain filter grayscale opacity-80 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105"
                                    />
                                  ) : (
                                    <svg className="w-6 h-6 text-gray-500 filter grayscale opacity-80 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                      <path d="M12 2L2 12l10 10 10-10L12 2z" />
                                    </svg>
                                  )}
                                  <span>{shape.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Shop by Metal Section */}
                        {shapeData?.data?.Metal_Type && shapeData.data.Metal_Type.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <div className="text-[10px] font-bold tracking-[0.12em] text-gray-400 uppercase pl-1">
                              Shop by Metal
                            </div>
                            <div className="flex flex-wrap gap-2 pl-1 !pl-3">
                              {shapeData.data.Metal_Type.map(type => {
                                const getMetalDotStyle = (name) => {
                                  const lower = name.toLowerCase();
                                  if (lower.includes('yellow') && lower.includes('white')) {
                                    return { background: 'linear-gradient(135deg, #ffe89e 0%, #d4af37 50%, #fcfcfc 50%, #dcdcdc 100%)', border: '1px solid #bfa030' };
                                  }
                                  if (lower.includes('rose') && lower.includes('white')) {
                                    return { background: 'linear-gradient(135deg, #fcd5d5 0%, #e5989b 50%, #fcfcfc 50%, #dcdcdc 100%)', border: '1px solid #d68285' };
                                  }
                                  if (lower.includes('white') || lower.includes('platinum')) {
                                    return { background: 'radial-gradient(circle, #fcfcfc 0%, #dcdcdc 100%)', border: '1px solid #c0c0c0' };
                                  }
                                  if (lower.includes('rose') || lower.includes('pink')) {
                                    return { background: 'radial-gradient(circle, #fcd5d5 0%, #e5989b 100%)', border: '1px solid #d68285' };
                                  }
                                  if (lower.includes('yellow') || lower.includes('18k') || lower.includes('gold')) {
                                    return { background: 'radial-gradient(circle, #ffe89e 0%, #d4af37 100%)', border: '1px solid #bfa030' };
                                  }
                                  return { background: '#94a3b8', border: '1px solid #64748b' };
                                };
                                return (
                                  <Link
                                    key={type.id}
                                    href={`/${menu.slug}?metal_type=${type.slug}`}
                                    onClick={() => setMobileNavOpen(false)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#0f172a] hover:text-gold transition-all duration-200"
                                  >
                                    <span style={getMetalDotStyle(type.name)} className="w-2.5 h-2.5 rounded-full flex-shrink-0" />
                                    <span>{type.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Drawer Extra Links */}

            </div>
          )}
        </div>
      </div>

      {/* ERROR */}
      {error && <p className="nav-error">{error}</p>}

      {/* Mobile Bottom Navigation Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 flex items-center justify-around z-[9990] md:hidden px-6 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <Link href="/" className="flex items-center justify-center text-gray-700 hover:text-gold transition-colors duration-200">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </Link>
        <Link href="/wishlist" className="flex items-center justify-center text-gray-700 hover:text-gold transition-colors duration-200 relative">
          <HeartSVG />
          <span className="absolute -top-1.5 -right-2 bg-navy text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </Link>
        <Link href="/cart" className="flex items-center justify-center text-gray-700 hover:text-gold transition-colors duration-200 relative">
          <CartSVG />
          <span className="absolute -top-1.5 -right-2 bg-navy text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </Link>
        <Link href="/account" className="flex items-center justify-center text-gray-700 hover:text-gold transition-colors duration-200">
          <UserSVG />
        </Link>
      </div>
    </>
  )
}