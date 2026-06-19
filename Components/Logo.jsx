// src/components/Logo.jsx
import React from 'react'
import { DiamondSVG } from '../icons/icons'

export default function Logo() {
  return (
    <div className="logo">
      <DiamondSVG />
      <span className="logo-text">KOHIRA</span>
    </div>
  )
}