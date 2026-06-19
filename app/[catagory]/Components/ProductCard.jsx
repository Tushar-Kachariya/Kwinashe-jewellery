'use client'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductCard({ product, loading, className = "" }) {

  // Skeleton Loading UI
  if (loading) {
    return (
      <div className={`pc-card ${className}`}>

        <div className="pc-img-wrap">
          <Skeleton height={320} />
        </div>

        <div className="pc-info">

          <div
            className="pc-dots"
            style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}
          >
            <Skeleton circle width={15} height={15} />
            <Skeleton circle width={15} height={15} />
            <Skeleton circle width={15} height={15} />
          </div>

          <p className="pc-name">
            <Skeleton height={20} />
          </p>

          <div className="pc-price-row">
            <Skeleton width={80} height={20} />
          </div>

        </div>

      </div>
    )
  }

  return (
    <div className={`pc-card ${className}`}>

      {/* ── Image area ── */}
      <Link
        href={`/jewellery-details/${product.slug}`}
        className="pc-img-wrap"
      >

        {/* Primary image */}
        <div className="pc-img pc-img-primary">
          <Image
            src={product.default_image || product.second_image}
            alt={product.title || product.name}
            width={300}
            height={300}
            unoptimized
            priority
          />
        </div>

        {/* Secondary image */}
        <div className="pc-img pc-img-secondary">
          <Image
            src={product.second_image || product.default_image}
            alt={product.title || product.name}
            width={300}
            height={300}
            unoptimized
            priority
          />
        </div>

      </Link>

      {/* ── Info area ── */}
      <div className="pc-info">

        {/* Product Name */}
        <Link
          href={`/jewellery-details/${product.slug}`}
          className="pc-name"
        >
          {product.title}
        </Link>

        {/* Price */}
        <div className="pc-price-row">
          <span className="pc-price">
            {product?.setting_price
              ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
              }).format(product.setting_price)
              : 'Price on request'}
          </span>
        </div>

      </div>

    </div>
  )
}