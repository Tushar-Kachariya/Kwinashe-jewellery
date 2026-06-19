import HeroSection from '../../Components/HeroSection'
import ProductGrid from './Components/ProductGrid'

export default async function Page({
  params,
  searchParams,
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  // console.log('resolvedParams=========>', resolvedParams);
  // console.log('resolvedSearchParams=========>', resolvedSearchParams);

  const { catagory } = resolvedParams;

  // console.log('catagory=========>', catagory);
  return (
    <>
      <HeroSection />

      <ProductGrid
        category={catagory}
        shape={resolvedSearchParams?.diamond_type || ''}
        metal={resolvedSearchParams?.metal_type || ''}
        subcategory={resolvedSearchParams?.subcategory_slug || ''}
        sort={resolvedSearchParams?.sort || ''}
        price_min={resolvedSearchParams?.price_min || ''}
        price_max={resolvedSearchParams?.price_max || ''}
      />
    </>
  )
} 