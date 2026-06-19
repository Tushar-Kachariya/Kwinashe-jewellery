"use client"
import React, { useState, useEffect, useMemo } from 'react'
import ProductCard from '../app/[catagory]/Components/ProductCard'

import api from '..//api/axios'

export default function ProductList() {

  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [apiData, setApiData] = useState([])

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 16;

  const [filters, setFilters] = useState({
    draw: 1,
    start: 0,
    length: productsPerPage,
    category: "",
    subcategory_slug: ""

  })

  // PRODUCT API
  const getProducts = async () => {

    try {

      setLoading(true)
      setError(null)

      const payload = {
        search,
        category: filters.category,
        subcategory_slug: filters.subcategory_slug,
        start: (currentPage - 1) * productsPerPage,
        length: productsPerPage,
      }

     
      const response = await api.post("/products", payload)

      const productData = response?.data?.data || []
      // console.log("data========>",productData)
      setProducts(productData)

      setTotalProducts(
        response?.data?.recordsTotal ||
        response?.data?.total ||
        response?.data?.count ||
        productData.length ||
        0
      )

    } catch (error) {

      console.log(error)

      setError(
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong"
      )

      setProducts([])

    } finally {

      setLoading(false)

    }

  }

  // CATEGORY API

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await api.get("/category")

        const categories = response?.data?.data || []

        // REMOVE DUPLICATE CATEGORIES
        const uniqueCategories = [
          ...new Map(
            categories
              .filter((cat) => cat.isMenu === "Active")
              .map((cat) => [

                cat.slug.toLowerCase(),

                {
                  ...cat,

                  // REMOVE DUPLICATE SUBCATEGORY
                  subcategory: [
                    ...new Map(
                      (cat.subcategory || [])
                        .filter(
                          (sub) => sub.isMenu === "Active"
                        )
                        .map((sub) => [
                          sub.slug.toLowerCase(),
                          sub
                        ])
                    ).values()
                  ]

                }

              ])
          ).values()
        ]

        setApiData(uniqueCategories)

      } catch (err) {

        console.log(err)

        setError(err.message)

      }

    }

    fetchData()

  }, [])

  // AUTO FILTER API CALL
  useEffect(() => {

    getProducts()

  }, [filters, currentPage, search])

  // SELECTED CATEGORY
  const selectedCategory = useMemo(() => {

    return apiData.find(
      (cat) => cat.slug === filters.category
    )

  }, [apiData, filters.category])

  // TOTAL PAGES
  const totalPages = Math.ceil(
    totalProducts / productsPerPage
  )

  // RESET FILTERS
  const resetFilters = () => {

    setCurrentPage(1)

    setSearch('')

    setFilters({
      draw: 1,
      start: 0,
      length: productsPerPage,
      category: "",
      subcategory_slug: ""
    })

  }

  return (

    <div className="pl-wrap w-full overflow-x-hidden box-border">

      <div className="pl-header">

        <p className="pl-eyebrow">
          Our Collection
        </p>

        <h1 className="pl-title">
          All Jewelry
        </h1>

        <div className="pl-divider" />

      </div>

      {/* Toolbar */}
      <div className="pl-toolbar">

        <div className="pl-search">

          <input
            className="pl-search-input"
            placeholder="Search jewelry..."
            value={search}
            onChange={(e) => {

              setCurrentPage(1)
              setSearch(e.target.value)

            }}
          />

        </div>

        <span className="pl-count">

          {totalProducts} products

        </span>

      </div>

      <div className="pl-body">

        {/* Sidebar */}
        <aside className="pl-sidebar">

          {/* CATEGORY */}
          <div className="pl-filter-group">

            <h4 className="pl-filter-title">
              Category
            </h4>

            <button
              className={`pl-filter-btn ${filters.category === ""
                ? 'active'
                : ''
                }`}
              onClick={resetFilters}
            >

              All

            </button>

            {apiData
              ?.filter(menu => menu.isMenu === "Active")
              ?.map((cat) => (

                <button
                  key={cat.id || cat.slug}
                  className={`pl-filter-btn ${filters.category === cat.slug
                    ? 'active'
                    : ''
                    }`}
                  onClick={() => {

                    setCurrentPage(1)

                    setFilters((prev) => ({
                      ...prev,
                      category: cat.slug,
                      subcategory_slug: ""
                    }))

                  }}
                >

                  {cat.name}
                </button>

              ))}

          </div>

          {/* SUBCATEGORY */}
          {selectedCategory?.subcategory?.length > 0 && (

            <div className="pl-filter-group">

              <h4 className="pl-filter-title">
                Subcategory
              </h4>

              {[
                ...new Map(
                  selectedCategory?.subcategory
                    ?.filter((sub) => sub.isMenu === "Active")
                    ?.map((sub) => [sub.slug, sub])
                ).values()
              ].map((sub) => (

                <button
                  key={sub.id || sub.slug}
                  className={`pl-filter-btn ${filters.subcategory_slug === sub.slug
                    ? 'active'
                    : ''
                    }`}
                  onClick={() => {

                    setCurrentPage(1)

                    setFilters((prev) => ({
                      ...prev,
                      subcategory_slug: sub.slug
                    }))

                  }}
                >

                  {sub.name}

                </button>

              ))}

            </div>

          )}

        </aside>

        {/* PRODUCT GRID */}
        <main className="pl-grid-wrap">

          {error && <p>{error}</p>}

          {loading ? (

            <div className="pl-grid">

              {[...Array(8)].map((_, index) => (

                <div
                  key={index}
                  className="pl-skeleton-card"
                >

                  <div className="pl-skeleton-img" />

                  <div className="pl-skeleton-line short" />

                  <div className="pl-skeleton-line" />

                  <div className="pl-skeleton-line small" />

                </div>

              ))}

            </div>

          ) : products.length === 0 ? (

            <div className="pl-empty">

              <p>No products found.</p>

              <button
                className="pl-reset-btn"
                onClick={resetFilters}
              >

                Reset Filters

              </button>

            </div>

          ) : (

            <>
              <div className="pl-grid">

                {products.map((product) => (

                  <ProductCard
                    key={product.id || product._id}
                    product={product}
                  />

                ))}

              </div>

              {/* PAGINATION */}
              <div className="pl-pagination">

                <button
                  className="pl-page-btn nav-btn"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setCurrentPage(prev => prev - 1)
                  }
                >
                  ← Prev
                </button>

                <div className="pl-page-numbers">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (

                    <button
                      key={page}
                      className={`pl-page-btn ${currentPage === page
                        ? 'active-page'
                        : ''
                        }`}
                      onClick={() =>
                        setCurrentPage(page)
                      }
                    >

                      {page}

                    </button>

                  ))}

                </div>

                <button
                  className="pl-page-btn nav-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage(prev => prev + 1)
                  }
                >
                  Next →
                </button>

              </div>
            </>

          )}

        </main>

      </div>

    </div>

  )

}