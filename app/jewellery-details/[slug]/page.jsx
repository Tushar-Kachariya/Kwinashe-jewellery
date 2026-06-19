

// import ProductDetail from "../../../Components/Productdetail"
// import api from "../../../api/axios"

// export default async function Page({ params }) {
//   const { slug } = await params

//   let initialProduct = null;
//   try {
//     const res = await api.post(`/jdc/${slug}`);
//     initialProduct = res?.data?.data || null;
//   } catch (err) {
//     console.error("Error fetching product server-side:", err);
//   }

//   return <ProductDetail slug={slug} initialProduct={initialProduct} />
// }

import ProductDetail from "../../../Components/Productdetail"
import api from "../../../api/axios"

export default async function Page({ params }) {
  const { slug } = await params

  let initialProduct = null;
  try {
    const res = await api.post(`/jdc/${slug}`);
    initialProduct = res?.data?.data || null;
  } catch (err) {
    console.error("Error fetching product server-side:", err);
  }

  return <ProductDetail key={slug} slug={slug} initialProduct={initialProduct} />
}