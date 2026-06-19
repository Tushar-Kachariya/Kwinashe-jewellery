"use client";

import Image from "next/image";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GoldExchangeBanner() {
    const [banners, setBanners] = useState([]);
    const [img, setImg] = useState(0);

    useEffect(() => {
        const getBanners = async () => {
            try {
                const res = await api.get("/home/dashboard");
                setBanners(res?.data?.mainOfferSliderDetail || []);
            } catch (error) {
                console.log(error);
            }
        };

        getBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;

        const interval = setInterval(() => {
            setImg((prev) => (prev + 1) % banners.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [banners]);

    const nextSlide = () => {
        setImg((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setImg((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <section
            className="hero relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden"
        >
            {banners.length > 0 && (
                <Image
                    src={banners[img]?.image}
                    fill
                    alt="main banner"
                    style={{
                        objectFit: "cover",
                    }}
                    priority
                />
            )}

            <button
                onClick={prevSlide}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.1)",
                    border: "none",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    zIndex: 10,
                }}
            >
                <ChevronLeft size={30} />
            </button>

            <button
                onClick={nextSlide}
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "20px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.1)",
                    border: "none",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    zIndex: 10,
                }}
            >
                <ChevronRight size={30} />
            </button>
        </section>
    );
}