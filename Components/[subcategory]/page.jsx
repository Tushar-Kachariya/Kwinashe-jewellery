import HeroSection from '../../../Components/HeroSection'
import ProductGrid from '../Components/ProductGrid';

export default async function Page({
  params,
  searchParams,
}) {

  const { catagory } = await params;


  const filters = await searchParams;

  // console.log("fil====>",filters);

  return (
    <>
      <HeroSection />

      <ProductGrid
        category={catagory}
        // subcategory={subcategory || ''}
        metal={filters?.metal || ''}
        shape={filters?.shape || ''}
        sort={filters?.sort || ''}
        price_min={filters?.price_min || ''}
        price_max={filters?.price_max || ''}
      />
    </>
  )
}