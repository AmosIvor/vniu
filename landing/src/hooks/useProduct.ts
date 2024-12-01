import { getRequest } from '@/lib/fetch';
import { type z } from 'zod';
import type { getProductsSchema } from '@/lib/validations/product';
import axios from 'axios';

export const useProduct = () => {
  const onGetProductDetail = async (slug) => {
    const productDetail = await getRequest({
      endPoint: `/api/product/detail?productId=${slug}`,
    });
    // const data = await productDetail?.json();

    return productDetail;
  };

  const getProductsAction = async (
    input: z.infer<typeof getProductsSchema>
  ) => {
    const { sort, price_range, categories, subcategories, limit, offset } =
      input;

    const [column, order] =
      (sort?.split('.') as [keyof Product, 'asc' | 'desc']) || [];
    const [minPrice, maxPrice] = price_range?.split('-')?.map(Number) || [0, 0];
    const categoriesArray = categories?.split('.') || [];
    const subcategoriesArray = subcategories?.split('.') || [];

    const where = {
      AND: [
        categoriesArray.length
          ? { categoryId: { in: categoriesArray } }
          : undefined,
        subcategoriesArray.length
          ? { subcategory: { in: subcategoriesArray } }
          : undefined,
        minPrice ? { price: { gte: minPrice } } : undefined,
        maxPrice ? { price: { lte: maxPrice } } : undefined,
      ].filter(Boolean),
    };

    const items = await prisma.product.findMany({
      where,
      orderBy: {
        [column || 'id']: order || 'desc',
      },
      take: limit,
      skip: offset,
    });

    const count = await prisma.product.count({
      where,
    });

    return {
      items,
      count,
    };
  };

  const fetchProduct = async (
    {
      page,
      pageSize,
      //   q,
      //   sort,
      //   gender,
      //   categories,
      //   subcategories,
      //   price_range,
    } = {
      page: 1,
      pageSize: 4,
    }
  ) => {
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
    const endpoint = '/api/Product';

    // Add parameters to the endpoint
    // for (const [key, value] of Object.entries(params)) {
    //   if (value !== null && value !== undefined) {
    //     endpoint += `&${key}=${value}`;
    //   }
    // }

    // Make the API request
    // const products = await getRequest({ endPoint: endpoint });
    // const products = async () => {
    const response = await axios.get('http://localhost:5000' + endpoint, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'false',
        'Access-Control-Allow-Methods':
          'POST, PUT, PATCH, GET, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
      params: {
        page,
        pageSize,
      },
    });
    console.log('🚀 ~ products ~ response:', response);
    //   return response.data;
    // };
    // const products = await axios.get(process.env.BACKEND_URL + endpoint);
    // console.log('🚀 ~ useProduct ~ products:', products);
    // Handle the response and return the necessary data
    return {
      text: 'products',
      // totalPages: Math.round(products.totalPages),
      // totalItems: products.totalItems,
      // page: products.page,"
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
    getProductsAction,
    fetchProduct,
    onGetProductDetailFromOrder,
  };
};
