import { useParams } from 'next/navigation';
import { getRequest } from '@/lib/fetch';

export const useProduct = () => {
  const onGetProductDetail = async (slug) => {
    const productDetail = await getRequest({
      endPoint: `/api/Product/${slug}`,
    });
    console.log('🚀 ~ onGetProductDetail ~ productDetail:', productDetail);
    // const data = await productDetail?.json();

    return productDetail;
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
    page = 1,
    pageSize = 4,
  }: //   q,
  //   sort,
  //   gender,
  //   categories,
  //   subcategories,
  //   price_range,
  {
    page: number;
    pageSize: number;
  }) => {
    const params = {
      page,
      //   q,
      //   sort,
      //   gender,
      //   categories,
      //   subcategories,
      //   price_range,
    };

    // Construct the base endpoint
    let endpoint = '/api/Product?';

    // Add parameters to the endpoint
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        endpoint += `&${key}=${value}`;
      }
    }

    const products = await getRequest({ endPoint: endpoint });

    console.log('🚀 ~ products ~ response:', products.data);
    return {
      data: products.data.data,
      totalPages: Math.round(products.data.totalCount / pageSize),
      totalItems: products.data.totalCount,
      page: products.data.page,
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
