"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import api from "../api/axios"

export default function HeroSlider({ banners }) {
  const [bannersData, setBannersData] = useState(banners || [])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (banners && banners.length > 0) {
      setBannersData(banners)
    }
  }, [banners])

  useEffect(() => {
    if (bannersData.length > 0) return

    const getBanners = async () => {
      try {
        const res = await api.get("/home/dashboard")
        setBannersData(res?.data?.homestoresliderBanner || [])
      } catch (error) {
        console.error("Client fallback fetch failed:", error)
      }
    }
    getBanners()
  }, [bannersData])

  useEffect(() => {
    if (!bannersData || bannersData.length <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannersData.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [bannersData])

  if (!bannersData || bannersData.length === 0) {
    return (
      <div className="w-full h-[260px] sm:h-[400px] md:h-[500px] lg:h-[700px] bg-[#fdf6f0] animate-pulse flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-48 h-8 bg-rose-100/80 rounded-md mx-auto" />
          <div className="w-72 h-4 bg-rose-100/50 rounded-md mx-auto" />
        </div>
      </div>
    )
  }

  const nextSlide = () => setCurrent((prev) => (prev + 1) % bannersData.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + bannersData.length) % bannersData.length)

  return (
    <div className="relative w-full h-[260px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden group">
      {bannersData.map((banner, index) => {
        const isActive = index === current
        return (
          <div
            key={banner.id || index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Desktop Image */}
            <div className="hidden sm:block w-full h-full relative">
              <Image
                src={banner.image}
                fill
                alt={banner.title_en || "banner image"}
                className="object-cover"
                priority={index === 0}
                unoptimized
              />
            </div>

            {/* Mobile Image */}
            <div className="block sm:hidden w-full h-full relative">
              <Image
                src={banner.mobile_img || banner.image}
                fill
                alt={banner.title_en || "banner image"}
                className="object-cover object-center"
                priority={index === 0}
                unoptimized
              />
            </div>

            {/*
              ─── MOBILE OVERLAY (sm and below) ───────────────────────────────────
              Full-width bottom gradient panel so text is always readable
            */}
            <div className="absolute inset-x-0 bottom-0 z-20 sm:hidden">
              {/* Gradient scrim from transparent → brand dark */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e]/80 via-[#0d1b3e]/40 to-transparent" />
              <div className="relative px-5 pb-8 pt-10 text-white">
                {banner.title_en && (
                  <h2 className="font-serif font-light text-xl leading-tight uppercase tracking-widest mb-2">
                    {banner.title_en}
                  </h2>
                )}
                {banner.description_en && (
                  <p className="text-xs text-white/80 font-light leading-relaxed mb-4">
                    {banner.description_en}
                  </p>
                )}
                <button className="px-6 py-2.5 bg-white hover:bg-[#c9a84c] text-[#0d1b3e] hover:text-white font-medium text-[10px] tracking-widest uppercase transition-all duration-300 border-0 cursor-pointer shadow-md">
                 
                </button>
              </div>
            </div>

            {/*
              ─── DESKTOP TEXT BLOCK (sm and above) ───────────────────────────────
              Right-aligned, vertically centered, with a subtle side gradient
            */}
            <div className="hidden sm:flex absolute inset-0 z-20 items-center justify-end">
              {/* Soft right-side gradient scrim for text legibility */}
              <div className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-l from-black/30 via-black/10 to-transparent pointer-events-none" />

              <div className="relative px-8 md:px-16 lg:px-24 max-w-[52%] lg:max-w-[45%] text-left space-y-4 lg:space-y-5">
                {banner.title_en && (
                  <h2 className="font-serif font-light text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight uppercase tracking-widest text-[#0d1b3e] drop-shadow-sm m-0">
                    {banner.title_en}
                  </h2>
                )}
                {banner.description_en && (
                  <p className="text-xs md:text-sm text-[#1a1a2e]/80 font-light leading-relaxed m-0 max-w-xs">
                    {banner.description_en}
                  </p>
                )}
                {/* <div className="pt-1">
                  <button className="px-7 py-3 bg-[#0d1b3e] hover:bg-[#c9a84c] text-white font-medium text-[11px] tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer border-0">
                    Explore More
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation Arrows */}
      {bannersData.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/20 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 cursor-pointer border-0"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/20 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 cursor-pointer border-0"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {bannersData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                  idx === current ? "bg-white w-5 sm:w-6" : "bg-white/40 w-1.5"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}