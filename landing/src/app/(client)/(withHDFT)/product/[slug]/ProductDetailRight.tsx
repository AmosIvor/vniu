'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { currencyFormat, parseJSON } from '@/lib/utils';
import React, { use, useEffect, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Image from 'next/legacy/image';
import { useCart } from '@/hooks/useCart';
import { useSelectedProduct } from '@/hooks/useSelectedProduct';
function ProductDetailRight({ data, selectedColor, handleColorSelect }) {
  const [showError, setShowError] = useState(false);
  const [selectedSize, setSelectedSize] = useState<{
    sizeOptionName: string;
    sizeOptionQuantityInStock: number;
  } | null>(null);

  const { onSelectProduct, onToggleDialog } = useSelectedProduct();

  const { cart } = useCart();
  return (
    <div className="flex-[1] py-3">
      {/* Product Title */}
      <div className="text-[34px] font-semibold mb-2 leading-tight">
        {data?.name}
      </div>

      {/* Product Subtitle */}
      <div className="text-lg font-semibold mb-5">{data?.description}</div>

      {/* Product size */}

      <div className="mb-10">
        {/* Heading */}
        <div className="flex justify-between mb-2">
          <div className="text-md font-semibold">Chọn màu sắc</div>
          <div className="text-md font-medium text-black/[0.5] cursor pointer">
            Màu sắc
          </div>
        </div>
        {/* Heading */}

        {/* Size start */}
        <div id="coloursGrid" className="grid grid-cols-3 gap-2">
          {data?.colours?.map((colour, index) => (
            <div
              onClick={() => {
                console.log('🚀 ~ ProductDetailRight ~ colour:', colour);

                handleColorSelect(colour.id);
                setShowError(false);
              }}
              key={index}
              className={`border-2 rounded-md text-center py-2.5 font-medium hover:bg-slate-300 cursor-pointer ${'hover:border-black cursor-pointer'} ${
                selectedColor === colour.id ? 'border-black' : ''
              } `}
              style={{
                backgroundColor: colour.hexCode,
                color: colour.hexCode?.includes('000000') ? 'white' : 'black',
              }}
            >
              {colour.name}
            </div>
          ))}
        </div>
        {/* Size end */}

        {/* Show error */}
        {showError && !selectedColor && (
          <div className="text-red-600 mt-1">Please choose colour</div>
        )}
        {/* Show error */}
      </div>
      {/* Product Price */}
      {data?.activeObject?.activeProductItem?.salePrice && (
        <div className="text-lg font-semibold ">
          {currencyFormat(data?.activeObject?.activeProductItem?.salePrice)}
        </div>
      )}

      {data?.activeObject?.activeProductItem?.originalPrice && (
        <div>
          <p className="text-base font-medium line-through ">
            {currencyFormat(
              data?.activeObject?.activeProductItem?.originalPrice
            )}
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            {' '}
            12% off
          </p>
        </div>
      )}
      {/* Size start */}
      <div id="sizesGrid" className="grid grid-cols-3 gap-2">
        {data?.activeObject?.activeSizeOptionAndQuantityInStocks?.map(
          (size, index) => (
            <div
              onClick={
                size.sizeOptionQuantityInStock > 0
                  ? () => {
                      setSelectedSize(size);
                      setShowError(false);
                    }
                  : () => {}
              }
              key={index}
              className={`border-2 rounded-md text-center py-2.5 font-medium
    hover:bg-slate-300 
      cursor-pointer ${
        size.number > 0
          ? 'hover:border-black cursor-pointer'
          : 'cursor-not-allowed disabled bg-black/[0.1] opacity-50'
      } ${
                selectedSize?.sizeOptionName === size.sizeOptionName
                  ? 'border-black'
                  : ''
              } `}
            >
              {size.sizeOptionName}
              {' - '}
              {size.sizeOptionQuantityInStock > 0
                ? `(${size.sizeOptionQuantityInStock})`
                : '0'}
            </div>
          )
        )}
      </div>
      {/* Size end */}
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        {/* Product size */}
        {selectedColor ? (
          // <Sheet>
          //   <div>
          //     <SheetTrigger
          //       asChild
          //       as="div"
          //       className="w-full mx-0 flex items-center justify-center  "
          //     >
          <Button
            className="w-full py-4 rounded-full bg-black text-white text-lg mt-2
                  font-medium transition-transform active:scale-95 mb-3 hover:opacity-75
                  "
            onClick={() => {
              console.log('🚀 ~ ProductDetailRight ~ data:', data);
              onSelectProduct({ data: data });
              onToggleDialog();
            }}
          >
            Add to Cart
          </Button>
        ) : (
          //       </SheetTrigger>
          //     </div>
          //     <SheetContent side={'topRight'} className="w-[400px]">
          //       <SheetHeader>
          //         <div className="flex flex-row gap-3 items-center">
          //           <BsFillCheckCircleFill
          //             className="text-green-500 mr-2"
          //             size={20}
          //           />
          //           <SheetTitle>Add to Cart Success!</SheetTitle>
          //         </div>
          //         <div className=" flex flex-row gap-4 w-full">
          //           <div className="relative aspect-square h-24 w-16 min-w-fit overflow-hidden rounded">
          //             <Image
          //               alt="add to cart"
          //               src={
          //                 data?.activeObject?.activeProductImages[0].imageUrl ||
          //                 '/assets/placeholder.png'
          //               }
          //               sizes="(max-width: '768px') 100vw, (max-width: 1200px) 50vw, 33vw"
          //               layout="fill"
          //               className="absolute object-cover"
          //               loading="lazy"
          //             />
          //           </div>
          //           <div className="flex flex-col">
          //             <span
          //               className="text-black text-sm
          // font-medium"
          //             >
          //               {data?.name}
          //             </span>
          //             <span
          //               className="text-black text-sm
          // font-normal"
          //             >
          //               Cloth
          //             </span>
          //             <span
          //               className="text-black text-sm
          // font-normal"
          //             >
          //               {selectedColor}
          //             </span>

          //             <span
          //               className="text-black text-sm
          // font-medium"
          //             >
          //               {currencyFormat(data?.price)}
          //             </span>
          //           </div>
          //         </div>
          //         <div className="flex-row flex w-full py-3">
          //           <Button variant={'outline'} className="w-full ">
          //             Xem giỏ hàng ({cart?.listItem.length})
          //           </Button>

          //           <Button className="w-full">Thanh toán</Button>
          //         </div>
          //       </SheetHeader>
          //     </SheetContent>
          //   </Sheet>
          <div className="w-full flex">
            <Button
              className="w-full py-4  rounded-full bg-black text-white text-lg
        font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedColor) {
                  setShowError(true);
                  document.getElementById('coloursGrid')?.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Add to Cart
            </Button>
          </div>
        )}
        {/* <div className="w-full flex ">
          <Button
            variant={'outline'}
            className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10"
          >
            Yêu thích
            <IoMdHeartEmpty size={20} />
          </Button>
        </div> */}
      </div>

      <div>
        <div className="text-lg font-bold mb-5">Thông tin chi tiết</div>
        <div className="markdown text-md mb-5">{data?.description}</div>
      </div>
    </div>
  );
}

export default ProductDetailRight;
