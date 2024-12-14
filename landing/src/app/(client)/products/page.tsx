import React from 'react';
import AddProductDialog from '../(withHDFT)/(home)/AddProductDialog';
import Products from './Products';

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined | null };
}) {
  // const sort = searchParams ? searchParams?.sort : null;
  // const gender = searchParams ? searchParams?.gender : null;
  // const categoryIds = searchParams ? searchParams?.categoryIds : null;
  // const subcategories = searchParams ? searchParams?.subcategories : null;
  // const price_range = searchParams ?searchParams?.price_range: null;
  // const SearchTerm = searchParams ? searchParams?.SearchTerm : null;
  return (
    <div className="w-full h-full">
      <Products
        categoryIds={searchParams?.categoryIds}
        SearchTerm={searchParams?.SearchTerm}
        // sort={searchParams?.sort}
        // gender={searchParams?.gender}
        // categories={searchParams?.categories}
        // subcategories={searchParams?.subcategories}
        // price_range={searchParams?.price_range}
      />
      <AddProductDialog />
    </div>
  );
}
