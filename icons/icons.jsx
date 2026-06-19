// src/icons/Icons.jsx
import React from 'react'

export const DiamondSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d1b3e" strokeWidth="1.5">
    <path d="M12 2L2 8l10 14L22 8z" />
    <path d="M2 8h20M7 8l5 14M17 8l-5 14" />
  </svg>
)

export const PhoneSVG = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
)

export const MailSVG = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

export const SearchSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

export const UserSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export const HeartSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const CartSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

export const WaSVG = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

export const shapeSVGs = {
  ROUND:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="8" /></svg>,
  EMERALD:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="4" width="12" height="16" rx="2" /></svg>,
  RADIANT:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="5" y="5" width="14" height="14" rx="1" /></svg>,
  OVAL:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="12" rx="7" ry="10" /></svg>,
  MARQUISE: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2C16 7 18 10 18 12C18 14 16 17 12 22C8 17 6 14 6 12C6 10 8 7 12 2Z" /></svg>,
  CUSHION:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="5" y="5" width="14" height="14" rx="4" /></svg>,
  HEART:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 21C12 21 3 14 3 8A4 4 0 0 1 10.93 6.5L12 8L13.07 6.5A4 4 0 0 1 21 8C21 14 12 21 12 21Z" /></svg>,
  PEAR:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 3C16 3 19 6 19 9C19 14 15 20 12 21C9 20 5 14 5 9C5 6 8 3 12 3Z" /></svg>,
  PRINCESS: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="6" width="12" height="12" /></svg>,
  TRIANGLE: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><polygon points="12,4 22,20 2,20" /></svg>,
  ASSCHER:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="6" width="12" height="12" /><rect x="8" y="8" width="8" height="8" /></svg>,
}