'use client'

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import RecommendedJewelleryList from "../app/jewellery-details/[slug]/Components/RecommendedJewelleryList";
import api from "../api/axios";

export default function ProductDetail({ slug, initialProduct }) {

  const router = useRouter();
  const [data, setdata] = useState(initialProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const [ringSize, setRingSize] = useState(initialProduct.jewelry_ring_size.paraname);
  const [price, setprice] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [stoneOpen, setStoneOpen] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [cStoneOpen, setCStoneOpen] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setdata(initialProduct);
      setprice(initialProduct?.setting_price)
      setRingSize(initialProduct?.jewelry_ring_size?.paraname)
    }
  }, [initialProduct]);


  useEffect(() => {
    if (!data?.id || !ringSize) return;

    const getPriceforRingSize = async () => {
      try {
        setPriceLoading(true);
        const payload = {
          jewelryId: data.id,
          totalmetalweight: data.metalweight,
          itemsize: ringSize,
          coupon_discount: '',
          coupon_type: '',
        };

        const res = await api.post(
          '/weightPriceUpdateJewellry',
          payload
        );
        // console.log('Price Response:', res.data);

        if (res?.data?.data?.finalAmount) {
          setprice(res.data.data.finalAmount);
        } else if (data?.setting_price) {
          setprice(data.setting_price);
        }

      } catch (error) {
        console.error('Price update error:', error);
      } finally {
        setPriceLoading(false);
      }
    };

    getPriceforRingSize();
  }, [ringSize]);
  const uniqueMetals = useMemo(() => {

    const metalsMap = new Map();

    data?.variants?.forEach((variant) => {
      const metalName = variant?.metal_type?.paraname;

      if (metalName) {

        metalsMap.set(metalName, {
          name: metalName,
          variant
        });

      }

    });
    // console.log('uniqueMetals=========>', Array.from(metalsMap.values()))

    return Array.from(metalsMap.values());

  }, [data]);


  // ── uniqueStamps (useMemo) ──
  const uniqueStamps = useMemo(() => {
    const StampsMap = new Map();

    data?.variants?.forEach((variant) => {
      const StampName = variant?.metal_stamp?.paraname;

      if (StampName) {

        StampsMap.set(StampName, {
          name: StampName,
          variant
        });

      }

    });
    // console.log('uniqueStamps=========>', Array.from(StampsMap.values()))

    return Array.from(StampsMap.values());
  }, [data]);

  // ── uniqueShapes (useMemo) ──
  const uniqueShapes = useMemo(() => {
    const ShapeMap = new Map();

    data?.variants?.forEach((variant) => {

      variant?.jewelry_diamonds?.forEach((jd) => {

        if (jd?.diamondtype === 'Center') {

          const ShapeName = jd?.shape?.paraname;

          if (ShapeName) {

            ShapeMap.set(ShapeName, {
              name: ShapeName,
              variant
            });

          }
        }


      })

    });
    // console.log('uniqueShapes=========>', Array.from(ShapeMap.values()))

    return Array.from(ShapeMap.values());
  }, [data]);



  if (!data) {
    return <p className="pd-not-found">Product not found.</p>;
  }
  const selectedMetal = data?.metal_type?.paraname;

  const selectedShape =
    data?.jewelry_diamonds?.find(
      (d) => d?.diamondtype === "Center"
    )?.shape?.paraname;
  const selectedStamp = data?.metal_stamp?.paraname;


  const pickVariant = ({ metal, stamp, shape } = {}) => {
    const finalMetal = metal || selectedMetal;
    const finalStamp = stamp || selectedStamp;
    const finalShape = shape || selectedShape;

    let matchedVariant = data?.variants?.find((v) => {
      return (
        v?.metal_type?.paraname === finalMetal &&
        v?.metal_stamp?.paraname === finalStamp &&
        v?.jewelry_diamonds?.find(
          (d) => d?.diamondtype === "Center"
        )?.shape?.paraname === finalShape
      );
    });

    if (!matchedVariant) {
      matchedVariant = data?.variants?.find((v) => {
        return (
          v?.metal_type?.paraname === finalMetal &&
          v?.jewelry_diamonds?.find(
            (d) => d?.diamondtype === "Center"
          )?.shape?.paraname === finalShape
        );
      });
    }

    if (!matchedVariant) {
      matchedVariant = data?.variants?.find((v) => {
        return (
          v?.metal_type?.paraname === finalMetal
        );
      });
    }

    if (matchedVariant?.slug && matchedVariant.slug !== slug) {
      router.replace(`/jewellery-details/${matchedVariant.slug}`);
    }
  };

  const displayImages = data?.allImages || [];
  const displayTitle = data?.title;
  const displayDescription = data?.description;
  const displayPrice = price;

  const productDetails = [
    { label: 'Product Code', value: data?.itemcode || '-' },
    { label: 'category', value: data?.category.name || '-' },
    { label: 'Metal', value: `${selectedStamp || ''} ${selectedMetal || ''}`.trim() || '-' },
    { label: 'Height', value: data?.height || '-' },
    { label: 'Width', value: data?.width || '-' },
    { label: 'Total Diamond Carat Weight', value: data?.all_total_carat || '-' }
  ];

  const stoneDetails = [
    {
      label: 'Shape', value: data?.jewelry_diamonds?.find(
        (d) => d?.diamondtype === "Center"
      )?.shape?.paraname
    },
    { label: 'Color', value: data?.centerstone?.stonecolor || '-' },
    { label: 'Clarity', value: data?.centerstone?.stonetype || '-' },
    {
      label: 'pices', value: data?.jewelry_diamonds?.filter(
        (d) => d?.diamondtype === "Center"
      ).length || '-'
    },
    { label: 'Total Weight', value: data?.total_carat || '-' },
  ];


  const cstoneDetails = [
    {
      label: 'Shape', value: data?.jewelry_diamonds?.find(
        (d) => d?.diamondtype === "Side"
      )?.shape?.paraname
    },
    { label: 'Color', value: data?.centerstone?.stonecolor || '-' },
    { label: 'Clarity', value: data?.centerstone?.stonetype || '-' },
    {
      label: 'pices', value: data?.jewelry_diamonds?.filter(
        (d) => d?.diamondtype === "Side"
      ).length || '-'
    },
    { label: 'Total Weight', value: data?.total_carat || '-' },
  ];

  const accordionData = [
    {
      title: "Product Details",
      details: productDetails,
      isOpen: detailsOpen,
      setOpen: setDetailsOpen,
    },
    {
      title: "Stone Details",
      details: stoneDetails,
      isOpen: stoneOpen,
      setOpen: setStoneOpen,
    },
    {
      title: "Side Stone Details",
      details: cstoneDetails,
      isOpen: cStoneOpen,
      setOpen: setCStoneOpen,
    },
  ];

  // console.log('data========>', data)
  // console.log("data========>", initialProduct)

  return (
    <>
      <div className="pd-wrap w-full overflow-x-hidden box-border">

        {/* THUMBNAILS */}

        <div className="pd-thumbs">

          {displayImages?.map((img, i) => (

            <div
              key={i}
              className={`pd-thumb ${selectedImage === i ? 'active' : ''}`}
              onClick={() => setSelectedImage(i)}
            >

              <img
                src={img?.thumb || img?.path}
                alt={img?.name}
              />

            </div>

          ))}

        </div>



        {/* MAIN IMAGE */}

        <div
          className="pd-main-img"
          onMouseMove={(e) => {

            const {
              left,
              top,
              width,
              height
            } = e.currentTarget.getBoundingClientRect();

            const x =
              ((e.clientX - left) / width) * 100;

            const y =
              ((e.clientY - top) / height) * 100;

            setZoomStyle({
              transformOrigin: `${x}% ${y}%`,
              transform: 'scale(2)'
            });

          }}
          onMouseLeave={() =>
            setZoomStyle({
              transform: 'scale(1)',
              transformOrigin: 'center'
            })
          }
        >

          {displayImages && displayImages.length > 0 ? (
            <img
              src={
                displayImages?.[selectedImage]?.thumb ||
                displayImages?.[selectedImage]?.path
              }
              alt={displayTitle}
              style={zoomStyle}
              className="pd-main-image-tag"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-stone-400 bg-stone-50 select-none">
              <svg className="w-12 h-12 mb-2 stroke-stone-300" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs uppercase tracking-wider font-medium">No Image Available</span>
            </div>
          )}

        </div>



        {/* PRODUCT INFO */}

        <div className="pd-info">

          <h1 className="pd-title">
            {displayTitle}
          </h1>

          <p className="pd-desc">
            Description : {displayDescription}
          </p>

          <div className="pd-price flex items-center gap-2">
            <span>
              {price
                ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(price)
                : 'Price on request'}
            </span>

            {priceLoading && (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
            )}
          </div>


          {/* METAL */}

          <div className="pd-section">

            <p className="pd-section-label">
              Metal Type :
              <span className="pd-section-value">
                {' '} {selectedMetal}
              </span>
            </p>

            <div className="pd-options">

              {uniqueMetals?.map((metal, i) => (
                <button
                  key={i}
                  className={`pd-metal-btn ${selectedMetal === metal?.name ? 'active' : ''}`}
                  onClick={() =>
                    pickVariant({ metal: metal?.name })
                  }
                  title={metal?.name}
                >
                  {metal?.img ? (
                    <img src={metal?.img} alt={metal?.name} />
                  ) : (
                    <span className={`metal-dot ${metal?.name?.toLowerCase()?.includes('yellow') ? 'dot-yellow' :
                      metal?.name?.toLowerCase()?.includes('rose') ? 'dot-rose' :
                        'dot-white'
                      }`} style={{ display: 'block', width: '100%', height: '100%', borderRadius: '50%' }} />
                  )}
                </button>

              ))}

            </div>

          </div>



          {/* STAMP */}

          <div className="pd-section">

            <p className="pd-section-label">
              Metal Stamp :
              <span className="pd-section-value">
                {' '} {selectedStamp}
              </span>
            </p>

            <div className="pd-options">

              {uniqueStamps?.map((stamp, i) => (

                <button
                  key={i}
                  className={`pd-stamp-btn ${selectedStamp === stamp?.name ? 'active' : ''}`}
                  onClick={() =>
                    pickVariant({ stamp: stamp?.name })
                  }
                >
                  {stamp?.name}
                </button>

              ))}

            </div>

          </div>



          {/* SHAPES */}


          {uniqueShapes?.length > 0 &&
            <div className="pd-section">

              <p className="pd-section-label">
                Shape :
                <span className="pd-section-value">
                  {' '} {selectedShape}
                </span>
              </p>

              <div className="pd-options">

                {uniqueShapes?.map((shape, i) => (

                  <button
                    key={i}
                    title={shape?.name}
                    className={`pd-shape-btn ${selectedShape === shape?.name ? 'active' : ''}`}
                    onClick={() =>
                      pickVariant({
                        shape: shape.name,
                      })
                    }
                  >

                    <img
                      src={
                        shape?.variant?.jewelry_diamonds?.find(
                          (d) => d?.diamondtype === "Center"
                        )?.shape?.image
                      }
                      alt={shape?.name}
                      className="pd-shape-img"
                    />
                  </button>
                ))}

              </div>

            </div>
          }



          {/* RING SIZE */}

          {data?.allRingSize?.length > 0 && (

            <div className="pd-section pd-size-row">

              <span className="pd-section-label pd-size-label">
                Ring Size :
              </span>

              <div className="pd-select-wrap">

                <select
                  className="pd-select"
                  value={ringSize}
                  onChange={(e) =>
                    setRingSize(e.target.value)
                  }
                >

                  {data?.allRingSize?.map((s, i) => (

                    <option
                      key={i}
                      value={s?.paraname}
                    >
                      {s?.paraname}
                    </option>

                  ))}

                </select>

              </div>

              <button className="pd-find-size">
                Find Size
              </button>

            </div>

          )}



          <button className="pd-add-cart">
            ADD TO CART
          </button>

          <div className="pd-contact-bar">
            <a href="mailto:info@kwinashe.com" className="pd-contact-item">
              {/* Mail icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email Us
            </a>
            <a href="tel:9909323235" className="pd-contact-item">
              {/* Phone icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
              </svg>
              9909323235
            </a>
          </div>

          {/* ── ACCORDION: Product Details ── */}
          {accordionData.map((section, index) => (
            <div className="pd-accordion" key={index}>
              <button
                className={`pd-acc-btn${section.isOpen ? " open" : ""}`}
                onClick={() => section.setOpen((prev) => !prev)}
              >
                <span>{section.title}</span>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {section.isOpen ? (
                    <line x1="5" y1="12" x2="19" y2="12" />
                  ) : (
                    <>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </>
                  )}
                </svg>
              </button>

              {section.isOpen && (
                <div className="pd-acc-body">
                  {section.details.map((item, i) => (
                    <div key={i} className="pd-detail-row">
                      <span className="pd-detail-label">{item.label}</span>
                      <span className="pd-detail-value">
                        {item.value || "-"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
      <RecommendedJewelleryList currentSlug={slug} />
    </>
  );

}