"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

import api from "../../../api/axios"
import ProductCard from "./ProductCard"
import FilterPanel from "./FilterPanel"

export default function ProductGrid({
  category,
  metal,
  shape,
  sort,
  price_min,
  price_max,
  subcategory,
}) {

  const router = useRouter()

  const [products, setProducts] = useState([])
  const [start, setStart] = useState(0)

  const [loading, setLoading] = useState(false)

  const [hasMore, setHasMore] = useState(true)

  const [resultCount, setResultCount] = useState(0)

  const observerRef = useRef(null)

  const LIMIT = 30

  const fetchProducts = useCallback(async (reset = false) => {

    try {

      setLoading(true)

      const currentStart = reset ? 0 : start

      const payload = {

        draw: "1",

        start: currentStart.toString(),

        length: LIMIT.toString(),

        metal_type: metal || "",

        diamond_type: shape || "",

        order_column: "setting_price",
        center_stone_shape: shape || "",
        sort: sort || "",

        category_slug: category || "",

        subcategory_slug: subcategory || "",

        price_min: price_min || "",

        price_max: price_max || "",

      }

      const res = await api.post("/products", payload)

      const data = res.data

      const newProducts = data?.data || []

      setResultCount(
        data?.total ||
        data?.count ||
        newProducts.length
      )

      if (reset) {

        setProducts(newProducts)

        setStart(LIMIT)

      } else {

        setProducts((prev) => [
          ...prev,
          ...newProducts,
        ])

        setStart((prev) => prev + LIMIT)

      }

      setHasMore(newProducts.length >= LIMIT)

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

    }

  }, [
    start,
    metal,
    shape,
    sort,
    category,
    subcategory,
    price_min,
    price_max,
  ])


  useEffect(() => {

    const resetProducts = async () => {

      setProducts([])

      setStart(0)

      setHasMore(true)

      await fetchProducts(true)

    }

    resetProducts()

  }, [
    category,
    metal,
    shape,
    sort,
    subcategory,
    price_min,
    price_max,
  ])



  useEffect(() => {

    const params = new URLSearchParams()

    if (category) {
      params.set("category", category)
    }

    if (subcategory) {
      params.set("subcategory_slug", subcategory)
    }

    if (metal) {
      params.set("metal_type", metal)
    }

    if (shape) {
      params.set("diamond_type", shape)
    }

    if (sort) {
      params.set("sort", sort)
    }

    if (price_min) {
      params.set("price_min", price_min)
    }

    if (price_max) {
      params.set("price_max", price_max)
    }

    const queryString = params.toString()

    router.replace(
      `${window.location.pathname}?${queryString}`,
      {
        scroll: false,
      }
    )

  }, [
    category || "",
    subcategory || "",
    metal || "",
    shape || "",
    sort || "",
    price_min || "",
    price_max || "",
  ])


  useEffect(() => {

    const observer = new IntersectionObserver(

      (entries) => {

        const first = entries[0]

        if (
          first.isIntersecting &&
          hasMore &&
          !loading
        ) {

          fetchProducts()

        }

      },

      {
        threshold: 1,
      }
    )

    const currentRef = observerRef.current

    if (currentRef) {

      observer.observe(currentRef)

    }

    return () => {

      if (currentRef) {

        observer.unobserve(currentRef)

      }

    }

  }, [fetchProducts, hasMore, loading])

  return (

    <FilterPanel resultCount={resultCount}>

      {products.length > 0 ? (

        <>
          <div className="kw-product-grid">

            {products.map((product, index) => (

              <ProductCard
                key={
                  index
                }
                product={product}
              />

            ))}

          </div>


          <div
            ref={observerRef}
            style={{
              height: "20px",
            }}
          />

          {loading && (

            <div className="kw-loading">

              <p>Loading products...</p>

            </div>

          )}

          {!hasMore && (

            <div className="kw-end">

              <p>No more products</p>

            </div>

          )}
        </>

      ) : (

        !loading && (

          <div className="kw-products-empty">

            <p>No products found.</p>

          </div>

        )

      )}

    </FilterPanel>

  )

}