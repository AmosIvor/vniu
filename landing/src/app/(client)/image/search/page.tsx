// import React from 'react';
// import ImageSearchWithCrop from './ImageSearch1';

// export default function Page() {
//   return (
//     <div className="w-full h-full">
//       <ImageSearchWithCrop />
//     </div>
//   );
// }
'use client';

import React, { use } from 'react';
import ImageSearchWithCrop from './ImageSearch2';

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
      <ImageSearchWithCrop
        categoryIds={categoryIds}
        SearchTerm={SearchTerm}
        colourIds={colourIds}
        // sort={resolvedSearchParams?.sort}
        price_range={price_range}
      />
    </div>
  );
}
