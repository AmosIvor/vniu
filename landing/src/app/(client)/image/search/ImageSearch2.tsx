'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, X, Loader } from 'lucide-react';
import Cropper, { type ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { postRequest } from '@/lib/fetch';
import { useProduct } from '@/hooks/useProduct';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Footer } from '@/components/footer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { type Option } from '@/models';
import { sortOptions } from '@/config/products';
// getSubcategories,
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
import { AiOutlineFilter } from 'react-icons/ai';
import { getRequest } from '@/lib/fetch';
import ProductCard from '@/components/ProductCard';
interface ProductsProps {
  SearchTerm: string | null;
  // sort: string | null;
  // gender: string | null;
  categoryIds: string | null;
  colourIds: string | null;
  price_range: string | null;
}

function ImageSearchWithCrop({
  SearchTerm,
  // sort,
  // gender,
  categoryIds,
  colourIds,
  price_range,
  ...props
}: ProductsProps) {
  const queryClient = useQueryClient();

  const { fetchProduct } = useProduct();
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [cropData, setCropData] = useState<string | null>(null);
  const [productItemIds, setProductItemIds] = useState<string[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch: refetchData,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['products image search'],
    ({ pageParam = 1 }) =>
      fetchProduct({
        PageIndex: pageParam,
        PageSize: 8,
        SearchTerm,
        // sort,
        // gender,
        categoryIds,
        colourIds,
        price_range,
        productItemIds,
      }),
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    }
  ); // Add this line for debugging

  //Add Filter
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Search params
  // const page = searchParams?.get('page') ?? '1';
  // const per_page = searchParams?.get('per_page') ?? '8';
  // const sort = searchParams?.get('sort') ?? 'id.desc';

  const [clothNavItems, SetClothNavItems] = useState([]);
  interface ColourNavItem {
    id: string;
    name: string;
    code?: string;
    hexCode?: string;
  }

  const [colourNavItems, setColourNavItems] = useState<ColourNavItem[]>([]);
  // Query Clothes Categories
  useEffect(() => {
    const getClothNavItems = async () => {
      const res = await getRequest({
        endPoint:
          '/api/v1/categories/get-by-parent/filter-and-sort?ParentCategoryId=245ff55d-c9f6-45d4-8338-e8584a499412&PageIndex=1&PageSize=100',
      });

      if (res) {
        SetClothNavItems(res.value.categories);
      }
    };
    getClothNavItems();
  }, []);

  // Query Colours
  useEffect(() => {
    const getColourNavItems = async () => {
      const res = await getRequest({
        endPoint: '/api/v1/colours?PageIndex=1&PageSize=100',
      });

      if (res) {
        setColourNavItems(res.value.items);
      }
    };
    getColourNavItems();
  }, []);
  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const searchParamsString = searchParams.toString();
      const newSearchParams = new URLSearchParams(searchParamsString);

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value.toString());
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Price filter
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 300,
  ]);
  const debouncedPrice = useDebounce(priceRange, 500);

  React.useEffect(() => {
    const [min, max] = debouncedPrice;
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          price_range: `${min}-${max}`,
        })}`,
        {
          scroll: false,
        }
      );
    });
    refetchData();
  }, [debouncedPrice]);

  // Category filter
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          categoryIds: selectedCategories?.length
            ? // Join categories with a dot to make search params prettier
              selectedCategories.map((c) => c).join('.')
            : null,
        })}`,
        {
          scroll: false,
        }
      );
    });
    refetchData();
  }, [selectedCategories]);
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // colourIds filter
  const [selectedColourIds, setSelectedColourIds] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          colourIds: selectedColourIds?.length
            ? // Join categories with a dot to make search params prettier
              selectedColourIds.map((c) => c).join('.')
            : null,
        })}`,
        {
          scroll: false,
        }
      );
    });
    refetchData();
  }, [selectedColourIds]);
  const toggleColourIds = (subcategory: string) => {
    setSelectedColourIds((prev) =>
      prev.includes(subcategory)
        ? prev.filter((c) => c !== subcategory)
        : [...prev, subcategory]
    );
  };

  // Search bar

  const [searchQuery, setSearchQuery] = useState<string | null>(
    SearchTerm ? SearchTerm : ''
  );
  const debouncedSearch = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    const encodedSearchQuery = encodeURI(debouncedSearch || '');
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          SearchTerm: encodedSearchQuery ? encodedSearchQuery : null,
        })}`,
        {
          scroll: false,
        }
      );
    });
    refetchData();
  }, [debouncedSearch]);

  // Category filter initialization from query parameter
  React.useEffect(() => {
    if (categoryIds) {
      const categoryIdsTemp = categoryIds.split('.').map((c) => c);
      setSelectedCategories(categoryIdsTemp);
    }
  }, [categoryIds]);

  React.useEffect(() => {
    if (colourIds) {
      const colourIdsTemp = colourIds.split('.').map((c) => c);
      setSelectedColourIds(colourIdsTemp);
    }
  }, [colourIds]);

  const debouncedCropData = useDebounce(cropData, 500);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateCroppedImage = async () => {
    if (!cropperRef.current) return null;

    const cropper = cropperRef.current.cropper;
    const canvas = cropper.getCroppedCanvas();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        1
      );
    });
  };

  const uploadImage = async (blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', blob, 'cropped.jpg');

    try {
      const response = await fetch('http://localhost:8000/retrieve-image/', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();
      await setProductItemIds(data.productItemIds);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = async () => {
    if (!imgSrc) return;

    try {
      const croppedBlob = await generateCroppedImage();
      if (croppedBlob) {
        await uploadImage(croppedBlob);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const clearImage = () => {
    setImgSrc('');
    setCropData(null);
    setProductItemIds([]);
  };

  const handleCrop = () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    const canvas = cropper.getCroppedCanvas();
    setCropData(canvas.toDataURL('image/jpeg'));
  };

  useEffect(() => {
    if (debouncedCropData) {
      handleSearchClick();
      refetchData();
    }
  }, [debouncedCropData]);

  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="flex items-center gap-2 border rounded-lg p-2 mx-auto justify-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 px-4 py-2 outline-none"
        />

        <div className="relative">
          <input
            type="file"
            onChange={onSelectFile}
            accept="image/*"
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2"
          >
            <Camera className="w-5 h-5" />
            <span className="text-sm">Search with image</span>
          </label>
        </div>
      </div>

      {imgSrc && (
        <div className="mt-4 flex gap-4 justify-center items-center">
          <div className="relative inline-block max-w-xl overflow-hidden">
            <Cropper
              ref={cropperRef}
              src={imgSrc}
              style={{ height: 400, width: '100%' }}
              // Cropper.js options
              initialAspectRatio={1}
              aspectRatio={1}
              guides={false}
              viewMode={1}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              crop={handleCrop}
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {cropData && (
            <div className="relative inline-block max-w-xs border rounded-lg overflow-hidden">
              <div className="text-center font-semibold mb-2">Preview</div>
              <img
                src={cropData}
                alt="Cropped Preview"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      )}
      <div className="w-full flex">
        <div className="flex space-x-2 items-end px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Filter products"
                className="fixed top-[55px] left-50 w-[30px] h-[30px] z-50 p-2 rounded-full bg-white shadow-md hover:shadow-lg"
                onClick={() => {
                  // Handle filter functionality here
                }}
                disabled={isPending}
              >
                <div className="transform duration-200 hover:scale-105 flex items-center justify-center cursor-pointer">
                  <AiOutlineFilter className="text-slate-600 w-6 h-6" />
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader className="px-1">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <Separator />
              <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 ">
                <form className="flex justify-center w-5/6 h-8 rounded-md px-3">
                  <input
                    value={searchQuery || ''}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-800 bg-zinc-100 focus:bg-white rounded-full focus:outline-none focus:ring-[1px] focus:ring-black placeholder:text-zinc-400"
                    placeholder="What are you looking?"
                  />
                </form>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-label="Sort products"
                      className="w-[60%] lg:w-auto h-6"
                      disabled={isPending}
                    >
                      Sort
                      <ChevronDownIcon
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator />
              <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Price range ($)
                  </h3>
                  <Slider
                    variant="range"
                    thickness="thin"
                    defaultValue={[0, 300]}
                    max={300}
                    step={1}
                    value={priceRange}
                    onValueChange={(value: typeof priceRange) =>
                      setPriceRange(value)
                    }
                  />
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={priceRange[1]}
                      className="h-9"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setPriceRange([value, priceRange[1]]);
                      }}
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={priceRange[0]}
                      max={300}
                      className="h-9"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setPriceRange([priceRange[0], value]);
                      }}
                    />
                  </div>
                </div>

                <ScrollArea className="my-2 h-[calc(100vh-8rem)] pb-10 pl-6 pr-5">
                  <div className="space-y-4">
                    <Accordion
                      type="multiple"
                      className="w-full overflow-auto no-scrollbar"
                    >
                      <AccordionItem value="cloth">
                        <AccordionTrigger className="text-sm">
                          Clothes
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col">
                            {clothNavItems?.map(
                              (subItem: ColourNavItem, index) =>
                                subItem.name ? (
                                  <Checkbox
                                    key={index}
                                    // Set the checked value based on whether the category is in selectedCategories
                                    isSelected={selectedCategories.includes(
                                      subItem.id
                                    )}
                                    // Pass a callback function that toggles the category on change
                                    onChange={() => toggleCategory(subItem.id)}
                                  >
                                    {subItem.name}
                                  </Checkbox>
                                ) : null
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="Colours">
                        <AccordionTrigger className="text-sm">
                          Colours
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col">
                            {colourNavItems?.map((subItem, index) =>
                              subItem.name ? (
                                <Checkbox
                                  key={index}
                                  // Set the checked value based on whether the category is in selectedCategories
                                  isSelected={selectedColourIds.includes(
                                    subItem.id
                                  )}
                                  // Pass a callback function that toggles the category on change
                                  onChange={() => toggleColourIds(subItem.id)}
                                >
                                  <span style={{ color: subItem.hexCode }}>
                                    {subItem.name}
                                  </span>
                                </Checkbox>
                              ) : null
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </ScrollArea>
              </div>
              <div>
                <Separator className="my-4" />
                <SheetFooter>
                  <Button
                    aria-label="Clear filters"
                    size="sm"
                    className="w-auto md:w-full pr-5"
                    onClick={() => {
                      startTransition(() => {
                        router.push('/products');
                        setPriceRange([0, 300]);
                        setSelectedCategories([]);
                        setSelectedColourIds([]);
                      });
                    }}
                    disabled={isPending}
                  >
                    Clear Filters
                  </Button>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {!isPending && !data?.pages?.[0]?.totalItems ? (
          <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
            <h1 className="text-center text-2xl font-bold">
              No products found
            </h1>
            <p className="text-center text-muted-foreground">
              Try changing your filters, or check back later for new products
            </p>
          </div>
        ) : null}
        {isFetching && !isFetchingNextPage ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="overflow-hidden">
            {data?.pages?.[0]?.totalItems ? (
              <InfiniteScroll
                loader={<Spinner size="lg" />}
                dataLength={(data?.pages?.length + 1) * 8} //This is important field to render the next data
                next={() => {
                  fetchNextPage();
                }}
                hasMore={hasNextPage || false}
                className="h-full"
                // below props only if you need pull down functionality
              >
                <div className="px-4">
                  {data?.pages?.map((item, index) => {
                    return (
                      <div
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        key={index}
                      >
                        {item.data.map((product, index) => {
                          return <ProductCard product={product} key={index} />;
                        })}
                      </div>
                    );
                  })}
                </div>
                {isFetchingNextPage ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : null}
                <Footer />
              </InfiniteScroll>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

export default ImageSearchWithCrop;
