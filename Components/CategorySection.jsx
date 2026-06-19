import Image from 'next/image';
import Link from 'next/link';
import api from "../api/axios";

export default async function CategorySection() {

  let categories = [];

  try {

    const res = await api.get('/home/categories');

    categories = res.data.category;

  } catch (error) {

    console.log(error);

  }

  return (

    <section className="explore w-full overflow-x-hidden box-border">

      <div className="explore-header">

        <p className="explore-eyebrow">
          Explore Products
        </p>

        <h2 className="explore-title">
          Shop Jewelry by Category
        </h2>

      </div>

      <div className="cat-grid">

        {categories.map((category) => {

          return (
            <div
              key={category.id}
              className="cat-card"
            >
              <Link href={`/${category.slug}`}>
                <div className="cat-img">

                  <img
                    src={category.image}
                    alt={category.name}
                  />

                </div>



                <div className="cat-label">
                  {category.name}
                </div>

              </Link>

            </div>

          );
        })}

      </div>

    </section>

  );
}