'use client';
import ProductDetailRight from './ProductDetailRight';
import ProductUserMayLike from './ProductUserMayLike';
import ProductReview from './ProductReview';
import AddProductDialog from '../../(home)/AddProductDialog';
import { useState, useEffect } from 'react';
import ProductDetailLeft from './ProductDetailLeft';
import { useProduct } from '@/hooks/useProduct';
import React from 'react';

function Page({ params }) {
  const unwrappedParams = React.use(params);

  const { onGetProductDetail } = useProduct();
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    productItemId: null,
    salePrice: 0,
    originalPrice: 0,
    productItemSold: 0,
    productImages: [],
    variations: [{ size: { sizeName: null }, variationId: null }],
    colourVMs: [{ colourName: null }],
  });
  const [isFocus, setIsFocus] = useState(false);

  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const productSlug = unwrappedParams.slug;
        const productData = await onGetProductDetail('2'); // or use slug if needed
        if (!productData) {
          setError('No product data available.');
        } else {
          setData(productData.data.data);

          setSelectedItem(productData.data.data.productItems[0]);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:py-20 overflow-hidden">
      <div
        className="w-full flex-col max-w-[1280px] px-5
  md:px-10 mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[100px] ">
          <div className=" w-full md:w-auto flex-[1.2] max-w-[500px] lg:max-w-full lg:mx-0">
            <ProductDetailLeft data={selectedItem} />
          </div>

          <div className="flex-[0.8] py-5">
            <ProductDetailRight
              data={data}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </div>
        {/* <div>
          <ProductReview product={data} />
        </div> */}
        {/* <div>
          <ProductUserMayLike data={data} />
        </div> */}
      </div>

      {/* <AddProductDialog /> */}
    </div>
  );
}

export default Page;
