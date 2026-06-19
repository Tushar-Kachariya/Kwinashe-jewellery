
"use client"
import { useState } from "react";

const DiamondIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <polygon points="20,4 36,16 20,36 4,16" stroke="#1e2d4a" strokeWidth="1.5" fill="none" />
    <polygon points="20,4 36,16 20,18 4,16" stroke="#1e2d4a" strokeWidth="1" fill="none" opacity="0.4" />
    <line x1="4" y1="16" x2="36" y2="16" stroke="#1e2d4a" strokeWidth="1" opacity="0.4" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ChevronUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const navLinks = {
  "Shop By Collection": [
    "Engagement Rings",
    "Bracelet",
    "Wedding Bands",
    "Earrings",
  ],
  "Customer Care": [
    "About Us",
    "Education",
    "Privacy Policy",
    "Terms & Condition",
    "Return Policy",
  ],
  "Contact Us": [
    "Contact Us",
    "Book Appointment",
    "Email Us",
  ],
};

const socialLinks = [
  { icon: <InstagramIcon />, label: "Instagram", href: "#" },
  { icon: <FacebookIcon />, label: "Facebook", href: "#" },
  { icon: <PinterestIcon />, label: "Pinterest", href: "#" },
  { icon: <TwitterXIcon />, label: "X (Twitter)", href: "#" },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer
      className="w-full overflow-x-hidden box-border"
      style={{
        background: "linear-gradient(160deg, #eef2f7 0%, #e8edf5 50%, #dde4f0 100%)",
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        borderTop: "1px solid rgba(30,45,74,0.1)",
      }}
    >
      {/* Google Fonts import via style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .footer-link {
          position: relative;
          color: #3a4a6b;
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          font-weight: 400;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.25s ease;
          padding-bottom: 2px;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #D4AF37;
          transition: width 0.3s ease;
        }
        .footer-link:hover { color: #1e2d4a; }
        .footer-link:hover::after { width: 100%; }
        .social-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px;
          border: 1px solid rgba(30,45,74,0.25);
          border-radius: 50%;
          color: #3a4a6b;
          transition: all 0.25s ease;
          background: transparent;
          cursor: pointer;
          text-decoration: none;
        }
        .social-btn:hover {
          background: #1e2d4a;
          color: #eef2f7;
          border-color: #1e2d4a;
          transform: translateY(-2px);
        }
        .section-heading {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1e2d4a;
        }
        .scroll-top-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px;
          border: 1px solid rgba(30,45,74,0.3);
          border-radius: 50%;
          color: #3a4a6b;
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .scroll-top-btn:hover {
          background: #1e2d4a;
          color: white;
          border-color: #1e2d4a;
        }
        .mobile-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: #1e2d4a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0;
        }
        .chevron {
          transition: transform 0.3s ease;
        }
        .chevron.open {
          transform: rotate(180deg);
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 32px 0" }}>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12">

          {/* Brand Column */}
          <div className="flex flex-col gap-6 md:col-span-1">
            {/* Logo */}
            <div className="flex flex-col items-start gap-2">
              <DiamondIcon />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 300,
                  letterSpacing: "0.28em",
                  color: "#1e2d4a",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                KOHIRA
              </span>
            </div>

            {/* Divider */}
            <div style={{ width: "40px", height: "1px", background: "rgba(30,45,74,0.3)" }} />

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.95rem",
                fontStyle: "italic",
                color: "#5a6a8a",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: "240px",
              }}
            >
              Kohira is committed to providing top-quality products while ensuring our customers always feel valued and supported.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map(({ icon, label, href }) => (
                <a key={label} href={href} className="social-btn" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns — Desktop */}
          {Object.entries(navLinks).map(([heading, links]) => (
            <div key={heading} className="hidden md:flex flex-col gap-5">
              <span className="section-heading">{heading}</span>
              <div style={{ width: "24px", height: "1px", background: "rgba(30,45,74,0.25)" }} />
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Nav Columns — Mobile Accordion */}
          <div className="md:hidden col-span-1 flex flex-col gap-4">
            {Object.entries(navLinks).map(([heading, links]) => (
              <div
                key={heading}
                style={{
                  borderBottom: "1px solid rgba(30,45,74,0.12)",
                  paddingBottom: "12px",
                }}
              >
                <button
                  className="mobile-toggle"
                  onClick={() => toggleSection(heading)}
                >
                  <span className="section-heading">{heading}</span>
                  <span className={`chevron ${openSection === heading ? "open" : ""}`}>
                    <ChevronUp />
                  </span>
                </button>
                {openSection === heading && (
                  <ul className="flex flex-col gap-3 mt-4 pl-1">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="footer-link">{link}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(30,45,74,0.12)",
            padding: "20px 0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.68rem",
              color: "#7a8aaa",
              letterSpacing: "0.08em",
              fontWeight: 300,
            }}
          >
            ©2025 Kohira Jewellery. All Rights Reserved | Managed &amp; Developed by{" "}
            <a
              href="#"
              style={{
                color: "#3a4a6b",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                fontWeight: 400,
              }}
            >
              Weingenious Technocrats
            </a>
            .
          </p>

          {/* Scroll to Top */}
          <button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
          >
            <ChevronUp />
          </button>
        </div>
      </div>
    </footer>
  );
}