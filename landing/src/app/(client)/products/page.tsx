'use client';

import React, { use } from 'react';
import AddProductDialog from '../(withHDFT)/(home)/AddProductDialog';
import Products from './Products';

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined | null };
}) {
  const { categoryIds, SearchTerm, price_range, colourIds } = use(
    searchParams
  ) as {
    categoryIds?: string | null;
    SearchTerm?: string | null;
    price_range?: string;
    colourIds?: string | null;
  };

  return (
    <div className="w-full h-full">
      <Products
        categoryIds={categoryIds}
        SearchTerm={SearchTerm}
        colourIds={colourIds}
        // sort={resolvedSearchParams?.sort}
        price_range={price_range}
      />
      <AddProductDialog />
    </div>
  );
}
