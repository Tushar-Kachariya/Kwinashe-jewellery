'use client'

import { useEffect, useState } from 'react'
import {
  FaChevronDown,
  FaRotateRight,
  FaSliders,
  FaXmark,
} from 'react-icons/fa6'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import api from '../../../api/axios'

export default function FilterPanel({
  children,
  resultCount = 0,
}) {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)

  const [openSections, setOpenSections] = useState({
    metal: true,
    shape: true,
    price: true,
  })

  const [data, setData] = useState({
    Metal_Type: [],
    Shape: [],
  })

  const PRICE_MIN = 0
  const PRICE_MAX = 20000

  const [selectedMetal, setSelectedMetal] = useState(
    searchParams.get('metal_type') || ''
  )

  const [selectedShape, setSelectedShape] = useState(
    searchParams.get('diamond_type') || ''
  )

  const [priceRange, setPriceRange] = useState({
    min: Number(searchParams.get('price_min') || PRICE_MIN),
    max: Number(searchParams.get('price_max') || PRICE_MAX),
  })

  const updateFilter = (key, value) => {

    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`?${params.toString()}`)

  }

  useEffect(() => {

    document.body.classList.toggle(
      'kw-filter-open',
      isOpen
    )

    return () => {
      document.body.classList.remove('kw-filter-open')
    }

  }, [isOpen])

  useEffect(() => {

    setSelectedMetal(searchParams.get('metal_type') || '')

    setSelectedShape(searchParams.get('diamond_type') || '')

    setPriceRange({
      min: Number(searchParams.get('price_min') || PRICE_MIN),
      max: Number(searchParams.get('price_max') || PRICE_MAX),
    })

  }, [searchParams])

  useEffect(() => {

    const getData = async () => {

      try {

        const res = await api.get('/Jewellery-filter')

        setData(res.data.data)

      } catch (err) {

        console.error(err)

      }

    }

    getData()

  }, [])
  const toggleSection = (section) => {

    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))

  }

  const handleViewResults = () => {

    const params = new URLSearchParams(
      searchParams.toString()
    )

    if (selectedMetal) {
      params.set('metal_type', selectedMetal)
    } else {
      params.delete('metal_type')
    }

    if (selectedShape) {
      params.set('diamond_type', selectedShape)
    } else {
      params.delete('diamond_type')
    }

    if (priceRange.min > PRICE_MIN) {
      params.set('price_min', priceRange.min)
    } else {
      params.delete('price_min')
    }

    if (priceRange.max < PRICE_MAX) {
      params.set('price_max', priceRange.max)
    } else {
      params.delete('price_max')
    }

    router.push(`?${params.toString()}`)

    setIsOpen(false)

  }

  const handleReset = () => {

    setSelectedMetal('')
    setSelectedShape('')

    setPriceRange({
      min: PRICE_MIN,
      max: PRICE_MAX,
    })

  }

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

  const priceFilterActive =
    priceRange.min > PRICE_MIN ||
    priceRange.max < PRICE_MAX

  const minPercent =
    ((priceRange.min - PRICE_MIN) /
      (PRICE_MAX - PRICE_MIN)) * 100

  const maxPercent =
    ((priceRange.max - PRICE_MIN) /
      (PRICE_MAX - PRICE_MIN)) * 100

  const selectedRangeStyle = {
    left: `${minPercent}%`,
    width: `${Math.max(maxPercent - minPercent, 0)}%`,
  }

  const selectedFilters = [
    data.Metal_Type.find(
      (metal) => metal.slug === selectedMetal
    ),

    data.Shape.find(
      (s) => s.slug === selectedShape
    ),

    priceFilterActive && {
      slug: 'price',
      name: `$${priceRange.min.toLocaleString()} - $${priceRange.max.toLocaleString()}`,
    },

  ].filter(Boolean)

  const removeSelectedFilter = (slug) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedMetal === slug) {
      setSelectedMetal('')
      params.delete('metal_type')
    }

    if (selectedShape === slug) {
      setSelectedShape('')
      params.delete('diamond_type')
    }

    if (slug === 'price') {
      setPriceRange({
        min: PRICE_MIN,
        max: PRICE_MAX,
      })
      params.delete('price_min')
      params.delete('price_max')
    }

    router.push(`?${params.toString()}`)
  }


  return (

    <section className="kw-products-page w-full overflow-x-hidden box-border">

      {/* Toolbar */}

      <div className="kw-products-toolbar">

        <div className="kw-toolbar-left">

          <button
            type="button"
            className="kw-filter-trigger"
            onClick={() => setIsOpen(true)}
          >

            <span>Filters</span>

            <FaSliders aria-hidden="true" />

          </button>

          <p className="kw-result-count">
            Result : <strong>{resultCount}</strong>
          </p>

        </div>

        <label className="kw-sort-control">

          <span>Sort By:</span>

          <select
            value={searchParams.get('sort') || ''}
            onChange={(e) =>
              updateFilter('sort', e.target.value)
            }
          >

            <option value="" disabled>
              Select ASC/DESC
            </option>

            <option value="asc">
              Price Low to High
            </option>

            <option value="desc">
              Price High to Low
            </option>

          </select>

        </label>

      </div>

      <div className="kw-products-grid-wrap">
        {children}
      </div>

      <div
        className={`kw-filter-shell ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >

        <button
          type="button"
          className="kw-filter-backdrop"
          aria-label="Close filters"
          onClick={() => setIsOpen(false)}
        />

        <aside
          className="kw-filter-panel"
          aria-label="Product filters"
        >

          <header className="kw-filter-header">

            <h2>Filters</h2>

            <div className="kw-filter-actions">

              <button
                type="button"
                aria-label="Reset filters"
                onClick={handleReset}
              >
                <FaRotateRight aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setIsOpen(false)}
              >
                <FaXmark aria-hidden="true" />
              </button>

            </div>

          </header>

          <div className="kw-filter-scroll-content">

            {selectedFilters.length > 0 && (

              <div className="kw-selected-filters">

                {selectedFilters.map((filter) => (

                  <button
                    type="button"
                    key={filter.slug}
                    className="kw-selected-filter"
                    onClick={() =>
                      removeSelectedFilter(filter.slug)
                    }
                  >

                    <span className="kw-selected-filter-label">
                      {filter.name}
                    </span>

                    <FaXmark aria-hidden="true" />

                  </button>

                ))}

              </div>

            )}

            {/* Metal */}

            <FilterSection
              title="Metal Type"
              isOpen={openSections.metal}
              onToggle={() => toggleSection('metal')}
            >

              <div className="kw-metal-options">

                {data.Metal_Type.map((metal) => (

                  <button
                    type="button"
                    key={metal.id}
                    className={`kw-metal-option ${selectedMetal === metal.slug
                      ? 'active'
                      : ''
                      }`}
                    aria-pressed={
                      selectedMetal === metal.slug
                    }
                    onClick={() =>
                      setSelectedMetal(metal.slug)
                    }
                  >

                    <span className="kw-metal-icon">
                      {metal.image && !metal.image.includes('default.png') ? (
                        <img
                          src={metal.image}
                          alt={metal.name}
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span
                          style={{
                            ...getMetalDotStyle(metal.name),
                            display: 'block',
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </span>

                    <span>{metal.name}</span>

                  </button>

                ))}

              </div>

            </FilterSection>

            {/* Shape */}

            <FilterSection
              title="Shape"
              isOpen={openSections.shape}
              onToggle={() => toggleSection('shape')}
            >

              <div className="kw-shape-grid">

                {data.Shape.map((shape) => (

                  <button
                    type="button"
                    key={shape.id}
                    className={`kw-shape-option ${selectedShape === shape.slug
                      ? 'active'
                      : ''
                      }`}
                    aria-pressed={
                      selectedShape === shape.slug
                    }
                    onClick={() =>
                      setSelectedShape(shape.slug)
                    }
                  >

                    <span className="kw-shape-icon">
                      {shape.image && !shape.image.includes('default.png') ? (
                        <Image
                          src={shape.image}
                          alt={shape.name}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 2L2 12l10 10 10-10L12 2z" />
                        </svg>
                      )}
                    </span>

                    <span>{shape.name}</span>

                  </button>

                ))}

              </div>

            </FilterSection>

            {/* Price */}

            <FilterSection
              title="Price"
              isOpen={openSections.price}
              onToggle={() => toggleSection('price')}
            >

              <div className="kw-price-filter">

                <div className="kw-price-range">
                  <div className="kw-price-track" />
                  <div
                    className="kw-price-fill"
                    style={selectedRangeStyle}
                  />

                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={100}
                    value={priceRange.min}
                    className="kw-range-input kw-range-min"
                    onChange={(event) => {
                      const min = Number(event.target.value)

                      setPriceRange((prev) => ({
                        min,
                        max: min > prev.max ? min : prev.max,
                      }))
                    }}
                  />

                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={100}
                    value={priceRange.max}
                    className="kw-range-input kw-range-max"
                    onChange={(event) => {
                      const max = Number(event.target.value)

                      setPriceRange((prev) => ({
                        min: max < prev.min ? max : prev.min,
                        max,
                      }))
                    }}
                  />
                </div>

                <div className="kw-price-values">
                  <span>${priceRange.min.toLocaleString()}</span>
                  <span>${priceRange.max.toLocaleString()}</span>
                </div>

              </div>

            </FilterSection>

          </div>

          {/* Submit */}

          <div className="kw-filter-submit">

            <button
              type="button"
              onClick={handleViewResults}
            >
              VIEW RESULTS
            </button>

          </div>

        </aside>

      </div>

    </section>

  )

}

function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}) {

  return (

    <section
      className={`kw-filter-section ${isOpen ? 'expanded' : ''
        }`}
    >

      <button
        type="button"
        className="kw-filter-section-toggle"
        onClick={onToggle}
      >

        <span>{title}</span>

        <FaChevronDown aria-hidden="true" />

      </button>

      {isOpen && (

        <div className="kw-filter-section-body">
          {children}
        </div>

      )}

    </section>

  )

}