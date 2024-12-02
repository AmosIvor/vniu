import ProductDetailLeft from './ProductDetailLeft';
// import ProductDetailRight from './ProductDetailRight';
import { useProduct } from '@/hooks/useProduct';
// import ProductUserMayLike from './ProductUserMayLike';
// import ProductReview from './ProductReview';
// import AddProductDialog from '../../(home)/AddProductDialog';

async function page({ params }) {
  const { slug } = params;
  const { onGetProductDetail } = useProduct();
  try {
    const data = await onGetProductDetail(slug); // Fetch data based on the slug
    if (!data) {
      return <div>No product data available.</div>;
    }
    return (
      <div className="w-full md:py-20 overflow-hidden">
        <div
          className="w-full flex-col max-w-[1280px] px-5
  md:px-10 mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[100px] ">
            <div className=" w-full md:w-auto flex-[1.2] max-w-[500px] lg:max-w-full lg:mx-0">
              <ProductDetailLeft data={data} />
            </div>

            {/* <div className="flex-[0.8] py-5">
            <ProductDetailRight data={data} />
          </div> */}
          </div>
          {/* <div>
          <ProductReview product={data} />
        </div>
        <div>
          <ProductUserMayLike data={data} />
        </div> */}
        </div>

        {/* <AddProductDialog /> */}
      </div>
    );
  } catch (err) {
    console.error('Error fetching product details:', err);
    return <div>Failed to load product details</div>;
  }
}

export default page;
