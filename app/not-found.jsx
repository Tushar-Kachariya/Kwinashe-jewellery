"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#faf9f7",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Subtle dot pattern background */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(circle, rgba(180,148,80,0.12) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Top soft glow */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "700px",
                    height: "300px",
                    background:
                        "radial-gradient(ellipse at top, rgba(212,175,55,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />



            <div
                style={{
                    position: "relative",
                    textAlign: "center",
                    padding: "2rem",
                    maxWidth: "520px",
                    width: "100%",
                }}
            >
                {/* Decorative top line */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        justifyContent: "center",
                        marginBottom: "1.5rem",
                    }}
                >
                    <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg, transparent, #b8912a)" }} />
                    <span style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#b8912a", textTransform: "uppercase" }}>
                        Error 404
                    </span>
                    <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg, #b8912a, transparent)" }} />
                </div>

                {/* 404 number */}
                <div
                    style={{
                        fontSize: "clamp(88px, 18vw, 160px)",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        color: "transparent",
                        backgroundImage:
                            "linear-gradient(135deg, #c9a84c 0%, #e8c96a 35%, #b8912a 60%, #d4af37 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginBottom: "0.5rem",
                        userSelect: "none",
                        fontFamily: "'Georgia', serif",
                    }}
                >
                    404
                </div>

                {/* Diamond divider */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        margin: "0 auto 1.5rem",
                    }}
                >
                    <div style={{ height: "1px", width: "60px", background: "rgba(184,145,42,0.35)" }} />
                    <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
                        <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill="#b8912a" />
                    </svg>
                    <div style={{ height: "1px", width: "60px", background: "rgba(184,145,42,0.35)" }} />
                </div>

                {/* Heading */}
                <h1
                    style={{
                        fontSize: "clamp(18px, 3.5vw, 26px)",
                        fontWeight: 400,
                        color: "#1a1410",
                        margin: "0 0 0.75rem",
                        letterSpacing: "0.04em",
                        fontFamily: "'Georgia', serif",
                    }}
                >
                    Page Not Found
                </h1>

                {/* Description */}
                <p
                    style={{
                        fontSize: "15px",
                        color: "#7a6a52",
                        margin: "0 0 2.5rem",
                        lineHeight: 1.8,
                        fontFamily: "'Georgia', serif",
                        fontWeight: 400,
                    }}
                >
                    The page you are looking for may have been moved,
                    deleted, or perhaps never existed at all.
                </p>

                {/* Buttons */}
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Back button */}
                    <button
                        onClick={() => router.back()}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "0 28px",
                            height: "48px",
                            borderRadius: "0",
                            border: "1px solid #b8912a",
                            background: "transparent",
                            color: "#b8912a",
                            fontSize: "12px",
                            fontFamily: "'Georgia', serif",
                            fontWeight: 400,
                            cursor: "pointer",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#b8912a";
                            e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#b8912a";
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Go Back
                    </button>

                    {/* Home button */}
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "0 28px",
                            height: "48px",
                            borderRadius: "0",
                            border: "none",
                            background: "#1a1410",
                            color: "#e8c96a",
                            fontSize: "12px",
                            fontFamily: "'Georgia', serif",
                            fontWeight: 400,
                            textDecoration: "none",
                            cursor: "pointer",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            transition: "background 0.25s ease, color 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#b8912a";
                            e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#1a1410";
                            e.currentTarget.style.color = "#e8c96a";
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Home Page
                    </Link>
                </div>

                {/* Bottom decorative line */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        justifyContent: "center",
                        marginTop: "3rem",
                    }}
                >
                    <div style={{ height: "1px", width: "32px", background: "rgba(184,145,42,0.25)" }} />
                    <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(122,106,82,0.5)", textTransform: "uppercase" }}>
                        Kohira Jewellery
                    </span>
                    <div style={{ height: "1px", width: "32px", background: "rgba(184,145,42,0.25)" }} />
                </div>
            </div>
        </main>
    );
}