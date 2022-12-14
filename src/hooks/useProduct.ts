import { useCallback } from 'react';
import useSWR from 'swr';
import useDebounce from 'hooks/useDebounce';
import { Product } from 'types/Product';

const API_PATH = import.meta.env.VITE_API_PATH;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProduct = (searchTerm: string) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<Product[]>(
    `${API_PATH}/products${debouncedSearchTerm ? `?q=${debouncedSearchTerm}` : ''}`,
    fetcher,
  );

  const filterByBrandProductList = useCallback(
    (brandName: string, discountPercent: number) => {
      return products
        ?.filter((product) => product.brand === brandName)
        ?.map((product) => {
          // Calculate discount product price by price in cents and discountPercent
          const discountPriceInCent = Math.round(
            product.price?.price_in_cents * ((100 - discountPercent) / 100),
          );

          return {
            ...product,
            price: {
              ...product.price,
              price_in_cents: discountPriceInCent,
              price: `${discountPriceInCent / 100}${product.price?.currency}`,
            },
          };
        });
    },
    [products],
  );

  const reverseString = (string: string) => {
    // Split string to string array, reverse elements and join the string again
    return string.split('').reverse().join('');
  };

  const reversedBrandNameProductList = useCallback(
    (brandName: string) => {
      return products?.map((product) =>
        product.brand === brandName
          ? {
              ...product,
              brand: reverseString(product.brand),
            }
          : product,
      );
    },
    [products],
  );

  const getFilteredProductList = useCallback(
    (lowerRange: number, higherRange: number, shippableCountry: string) => {
      // Pattern to get only price from string 738.38€ => 738.38
      const pricePattern = /\d+(?:\.\d+)?/g;

      return products
        ?.filter(({ price, shippable_countries: shippableCountries }) => {
          const productPrice = price.price.match(pricePattern);

          // Filter products with price in lowerRange to higherRange, and shippable country condition
          return (
            (productPrice || 0) > lowerRange &&
            (productPrice || 0) < higherRange &&
            shippableCountries.includes(shippableCountry)
          );
        })
        ?.sort(
          ({ price: firstPrice }, { price: secondPrice }) =>
            // Sort the products by ascending price
            firstPrice.price_in_cents - secondPrice.price_in_cents,
        );
    },
    [products],
  );

  return {
    products,
    isLoading,
    error,
    filterByBrandProductList,
    reversedBrandNameProductList,
    getFilteredProductList,
  };
};

export default useProduct;
