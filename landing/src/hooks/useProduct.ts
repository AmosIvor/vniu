import { useParams } from 'next/navigation';
import { getRequest, postRequest } from '@/lib/fetch';

export const useProduct = () => {
  const onGetProductDetail = async ({
    slug,
    colourId,
  }: {
    slug: string;
    colourId?: string;
  }) => {
    const formData = colourId ? { colourId } : {};

    const productDetail = await postRequest({
      endPoint: `/api/v1/products/${slug}`,
      formData,
      isFormData: false,
    });
    // const data = await productDetail?.json();

    return productDetail.value;
  };

  // const getProductsAction = async (
  //   input: z.infer<typeof getProductsSchema>
  // ) => {
  //   const { sort, price_range, categories, subcategories, limit, offset } =
  //     input;

  //   const [column, order] =
  //     (sort?.split('.') as [keyof Product, 'asc' | 'desc']) || [];
  //   const [minPrice, maxPrice] = price_range?.split('-')?.map(Number) || [0, 0];
  //   const categoriesArray = categories?.split('.') || [];
  //   const subcategoriesArray = subcategories?.split('.') || [];

  //   const where = {
  //     AND: [
  //       categoriesArray.length
  //         ? { categoryId: { in: categoriesArray } }
  //         : undefined,
  //       subcategoriesArray.length
  //         ? { subcategory: { in: subcategoriesArray } }
  //         : undefined,
  //       minPrice ? { price: { gte: minPrice } } : undefined,
  //       maxPrice ? { price: { lte: maxPrice } } : undefined,
  //     ].filter(Boolean),
  //   };

  //   const items = await prisma.product.findMany({
  //     where,
  //     orderBy: {
  //       [column || 'id']: order || 'desc',
  //     },
  //     take: limit,
  //     skip: offset,
  //   });

  //   const count = await prisma.product.count({
  //     where,
  //   });

  //   return {
  //     items,
  //     count,
  //   };
  // };

  const fetchProduct = async ({
    PageIndex = 1,
    PageSize = 8,
    //   q,
    //   sort,
    //   gender,
    colourIds,
    price_range,
    SearchTerm,
    categoryIds,
    productItemIds = [],
  }: {
    PageIndex: number;
    PageSize: number;
    SearchTerm: string | null;
    categoryIds: string | null;
    price_range: string | null;
    colourIds: string | null;
    productItemIds?: string[] | null;
  }) => {
    console.log('🚀 ~ useProduct ~ productItemIds:', productItemIds);
    const params = {
      PageIndex,
      // PageSize,
      SearchTerm,
      //   sort,
      //   gender,
      // colourIds,
      price_range,
    };

    // Construct the base endpoint
    let endpoint = '/api/v1/products/filter-and-sort?PageSize=8';

    // Add parameters to the endpoint
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        endpoint += `&${key}=${value}`;
      }
    }
    const CategoryIds = categoryIds ? categoryIds.split('.') : [];
    const ColourIds = colourIds ? colourIds.split('.') : [];
    const { minPrice, maxPrice } = price_range
      ? {
          minPrice: price_range.split('-')[0],
          maxPrice: price_range.split('-')[1],
        }
      : { minPrice: 0, maxPrice: 500 };
    const products = await postRequest({
      endPoint: endpoint,
      formData: {
        CategoryIds,
        ratingValue: 0,
        minPrice,
        maxPrice,
        colourIds: ColourIds,
        sizeOptionIds: [],
        productItemIds,
      },
      isFormData: false,
    });
    return {
      data: products.value.items,
      totalPages: Math.round(products.value.totalCount / PageSize),
      totalItems: products.value.totalCount,
      page: PageIndex,
    };
  };

  const onGetProductDetailFromOrder = async (id) => {
    try {
      const res = await getRequest({
        endPoint: `api/product/detail?productId=${id}`,
      });
      console.log(res);
      if (res) {
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    onGetProductDetail,
    // getProductsAction,
    fetchProduct,
    onGetProductDetailFromOrder,
  };
};
