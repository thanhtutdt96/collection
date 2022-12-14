import { useMemo, useState } from 'react';
import Loader from 'components/Loader';
import Navbar from 'components/Navbar';
import ProductItem from 'components/ProductItem';
import ToastError from 'components/ToastError';
import useProduct from 'hooks/useProduct';
import { DisplayMode, ShippableCountry } from 'types/Product';

const Home = () => {
  const [displayMode, setDisplayMode] = useState(DisplayMode.DEFAULT);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    products,
    isLoading,
    error,
    filterByBrandProductList,
    reversedBrandNameProductList,
    getFilteredProductList,
  } = useProduct(searchTerm);

  const displayProducts = useMemo(() => {
    switch (displayMode) {
      case DisplayMode.OFF_WHITE:
        return filterByBrandProductList(DisplayMode.OFF_WHITE, 10);
      case DisplayMode.LOUIS_VUITTON:
        return reversedBrandNameProductList(DisplayMode.LOUIS_VUITTON);
      case DisplayMode.UK_SHIPPABLE:
        return getFilteredProductList(500, 1500, ShippableCountry.UK);
      default:
        return products;
    }
  }, [
    displayMode,
    filterByBrandProductList,
    getFilteredProductList,
    products,
    reversedBrandNameProductList,
  ]);

  return (
    <>
      <Navbar
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="container mx-auto">
        <div className="hero min-h-screen py-7 items-start">
          <div className="flex-col md:flex-row hero-content flex-wrap gap-y-6">
            {isLoading && <Loader />}

            {error && <ToastError message="error" />}

            {searchTerm.length > 0 && displayProducts?.length === 0 && 'No products found'}

            {(displayProducts?.length || 0) > 0 &&
              displayProducts?.map(
                ({
                  brand,
                  deposited_on: depositedOn,
                  id,
                  name,
                  photoUrl,
                  price,
                  seller,
                  shippable_countries: shippableCountries,
                }) => (
                  <ProductItem
                    key={id}
                    name={name}
                    brand={brand}
                    sellerCountry={seller.country}
                    price={price.price}
                    shippableCountries={shippableCountries}
                    depositedOn={depositedOn}
                    photoUrl={photoUrl}
                    displayMode={displayMode}
                  />
                ),
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
