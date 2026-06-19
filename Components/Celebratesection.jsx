"use client";

import { useRef, useState, useEffect } from "react";
import api from "../api/axios";

function ReelCard({ reel }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play().catch(() => { });
    }
  }, []);

  const handleClick = () => {
    if (reel?.buttonlink) {
      window.open(reel.buttonlink, "_blank");
    }
  };

  return (
    <div
      className="relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer m-2 "
      style={{
        width: "clamp(160px, 17vw, 220px)",
        aspectRatio: "9/16",
        maxHeight: "420px",
        background: "#111",
        boxShadow: "0 4px 20px rgba(0,0,0,0.13)",
      }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={reel?.image}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function CelebrateSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const res = await api.get("/home/dashboard");

        setData(res?.data?.mainhomepagesinstareelDetail || []);
      } catch (error) {
        console.log(error);
      }
    };

    getBanners();
  }, []);

  return (
    <section
      className="w-full !py-12 overflow-hidden"
      style={{ background: "#f9f7f5" }}
    >
      {/* ── Header ── */}
      <div className="text-center !py-4  px-4">
        <h2
          className="uppercase mb-3"
          style={{
            fontSize: "clamp(0.9rem, 2.4vw, 1.3rem)",
            color: "#2a2a2a",
            letterSpacing: "0.24em",
            fontFamily: "Georgia, serif",
            fontWeight: "400",
          }}
        >
          Celebrate Every Moment Perfectly
        </h2>

        <p
          className="mt-5 mb-5 px-1"
          style={{
            color: "#999",
            fontSize: "clamp(0.78rem, 1.4vw, 0.9rem)",
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.75",
            fontFamily: "Georgia, serif",
          }}
        >
          Celebrate every moment with elegance.
          Timeless designs crafted to perfection.
          Jewelry that makes every occasion shine.
        </p>
      </div>

      {/* ── Auto Sliding Reels ── */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...data, ...data].map((reel, index) => (
            <ReelCard key={`${reel?.id}-${index}`} reel={reel} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
        }

        .marquee-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: scrollLeft 35s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}