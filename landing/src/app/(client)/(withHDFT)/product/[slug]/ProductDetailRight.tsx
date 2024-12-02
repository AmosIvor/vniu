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
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useSelectedProduct } from '@/hooks/useSelectedProduct';
type TOption = {
  productItemId: string;
  sizeName: string;
  colourName: string;
  optionName: string;
};
function ProductDetailRight({ data, selectedItem, setSelectedItem }) {
  const [optionData, setOptionData] = useState<TOption[]>([]);
  const [optionName, setOptionName] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const { cart } = useCart();
  const { onSelectProduct, onToggleDialog } = useSelectedProduct();
  useEffect(() => {
    const options = data.productItems.map((item) => {
      const { productItemId } = item;
      const { sizeName } = item.variations[0].size;
      const { colourName } = item.colourVMs[0];
      const optionName = `${colourName} - ${sizeName}`;

      return {
        productItemId,
        sizeName,
        colourName,
        optionName,
      };
    });
    setOptionData(options);
    setOptionName(options[0].optionName);
  }, [data]);
  if (!optionData) return <div>Loading...</div>;
  console.log(cart);
  return (
    <div className="flex-[1] py-3">
      {/* Product Title */}
      <div className="text-[34px] font-semibold mb-2 leading-tight">
        {data.productName}
      </div>

      {/* Product Subtitle */}
      <div className="text-lg font-semibold mb-5">
        {data.productDescription}
      </div>

      {/* Product Price */}
      <div className="text-lg font-semibold ">{currencyFormat(data.price)}</div>

      {data.original_price && (
        <div>
          <p className="text-base font-medium line-through ">
            {currencyFormat(data.original_price)}
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            {' '}
            17% off
          </p>
        </div>
      )}

      {/* Product size */}

      <div className="mb-10">
        {/* Heading */}
        <div className="flex justify-between mb-2">
          <div className="text-md font-semibold">Chọn kích cỡ</div>
          <div className="text-md font-medium text-black/[0.5] cursor pointer">
            Kích cỡ
          </div>
        </div>
        {/* Heading */}

        {/* Size start */}
        <div id="sizesGrid" className="grid grid-cols-3 gap-2">
          {/* {optionData?.map((option, index) => (
            <div
              onClick={
                // option. > 0 ?
                () => {
                  setOptionName(option.optionName);
                  const foundItem = data?.productItems?.find(
                    (i: { productItemId: any }) =>
                      i.productItemId === item?.productItemId
                  );
                  if (foundItem) {
                    setSelectedItem(foundItem);
                  }
                  setShowError(false);
                }
                // : () => {}
              }
              key={index}
              className={`border-2 rounded-md text-center py-2.5 font-medium hover:bg-slate-300 cursor-pointer ${
                // size.number > 0 ?
                'hover:border-black cursor-pointer'
                // : 'cursor-not-allowed disabled bg-black/[0.1] opacity-50'
              } ${optionName === option.optionName ? 'border-black' : ''} `}
            >
              {option.optionName}
            </div>
          ))} */}
          {optionData?.map((option, index) => (
            <div
              onClick={() => {
                console.log('🚀 ~ ProductDetailRight ~ option:', option);

                setOptionName(option.optionName);
                const foundItem = data?.productItems?.find(
                  (i: { productItemId: any }) =>
                    i.productItemId === option?.productItemId
                );
                console.log('🚀 ~ ProductDetailRight ~ foundItem:', foundItem);

                if (foundItem) {
                  setSelectedItem(foundItem);
                }
                setShowError(false);
              }}
              key={index}
              className={`border-2 rounded-md text-center py-2.5 font-medium hover:bg-slate-300 cursor-pointer ${'hover:border-black cursor-pointer'} ${
                optionName === option.optionName ? 'border-black' : ''
              } `}
            >
              {option.optionName}
            </div>
          ))}
        </div>
        {/* Size end */}

        {/* Show error */}
        {showError && (
          <div className="text-red-600 mt-1">Vui lòng chọn loai</div>
        )}
        {/* Show error */}
      </div>
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        {/* Product size */}
        {!optionName ? (
          <Sheet>
            <div>
              <SheetTrigger
                asChild
                as="div"
                className="w-full mx-0 flex items-center justify-center  "
              >
                <Button
                  className="w-full py-4 rounded-full bg-black text-white text-lg
                  font-medium transition-transform active:scale-95 mb-3 hover:opacity-75
                  "
                  onClick={() => {
                    onSelectProduct({ data: data });
                    onToggleDialog();
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </SheetTrigger>
            </div>
            <SheetContent side={'topRight'} className="w-[400px]">
              <SheetHeader>
                <div className="flex flex-row gap-3 items-center">
                  <BsFillCheckCircleFill
                    className="text-green-500 mr-2"
                    size={20}
                  />
                  <SheetTitle>Đã thêm vào giỏ hàng!</SheetTitle>
                </div>
                <div className=" flex flex-row gap-4 w-full">
                  <div className="relative aspect-square h-24 w-16 min-w-fit overflow-hidden rounded">
                    <Image
                      alt="add to cart"
                      src={
                        parseJSON(data?.thumbnail)?.url ||
                        '/assets/placeholder.png'
                      }
                      sizes="(max-width: '768px') 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                      className="absolute object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-black text-sm
        font-medium"
                    >
                      {data.name}
                    </span>
                    <span
                      className="text-black text-sm
        font-normal"
                    >
                      Giày
                    </span>
                    <span
                      className="text-black text-sm
        font-normal"
                    >
                      {optionName}
                    </span>

                    <span
                      className="text-black text-sm
        font-medium"
                    >
                      {currencyFormat(data.price)}
                    </span>
                  </div>
                </div>
                <div className="flex-row flex w-full py-3">
                  <Button variant={'outline'} className="w-full ">
                    Xem giỏ hàng ({cart?.listItem.length})
                  </Button>

                  <Button className="w-full">Thanh toán</Button>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="w-full flex ">
            <Button
              className="w-full py-4  rounded-full bg-black text-white text-lg
        font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!optionName) {
                  setShowError(true);
                  document.getElementById('sizesGrid')?.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        )}
        <div className="w-full flex ">
          <Button
            variant={'outline'}
            className="w-full py-4 rounded-full border border-black
        text-lg font-medium transition-transform active:scale-95 flex items-center
        justify-center gap-2 hover:opacity-75 mb-10
                "
          >
            Yêu thích
            <IoMdHeartEmpty size={20} />
          </Button>
        </div>
      </div>

      <div>
        <div className="text-lg font-bold mb-5">Thông tin chi tiết</div>
        <div className="markdown text-md mb-5">{data.description}</div>
      </div>
    </div>
  );
}

export default ProductDetailRight;
