import Link from 'next/link'
import React from 'react'
import { UserSVG, HeartSVG, CartSVG } from '../icons/icons'

export default function HeaderIcons({ showAccount = true }) {
  return (
    <div className="header-icons">
      {showAccount && (
        <div className="hidden md:block">
          <button className="icon-btn" aria-label="Account">
            <Link href='/login'>
              <UserSVG />
            </Link>
          </button>
        </div>
      )}  
      <button className="icon-btn" aria-label="Wishlist">
        <Link href='/wishlist'> <HeartSVG /></Link>
        <span className="badge">0</span>
      </button>
      <button className="icon-btn" aria-label="Cart">
        <CartSVG />
        <span className="badge">0</span>
      </button>
    </div>
  )
}