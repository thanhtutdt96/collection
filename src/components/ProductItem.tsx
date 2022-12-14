import { FC } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import useDate from 'hooks/useDate';
import { DisplayMode, ShippableCountry } from 'types/Product';

interface Props {
  name: string;
  brand: string;
  sellerCountry: string;
  price: string;
  depositedOn?: string;
  shippableCountries: string[];
  photoUrl: string;
  displayMode: DisplayMode;
}

const ProductItem: FC<Props> = ({
  name,
  brand,
  photoUrl,
  depositedOn,
  price,
  shippableCountries,
  sellerCountry,
  displayMode,
}) => {
  const { getPrettyDateTime } = useDate();

  const getFlagIcon = (countryCode: string) => {
    if (countryCode === ShippableCountry.UK) {
      return getUnicodeFlagIcon(ShippableCountry.GB);
    }

    return getUnicodeFlagIcon(countryCode);
  };

  return (
    <div className="card md:w-[250px] bg-base-100 shadow-xl hover:brightness-125 hover:cursor-pointer hover:ring-primary-content hover:ring-1 animate-slowfade">
      <figure className="bg-white">
        <img src={photoUrl} alt={name} className="w-full h-full object-contain aspect-[4/3]" />
      </figure>

      <div className="card-body p-4">
        <div className="card-title justify-between">
          <h4 className="text-sm truncate flex-1">{name}</h4>
        </div>

        <div className="flex items-center">
          <GlobeAltIcon className="w-4 h-4 mr-1" />
          <p className="text-xs text-gray-500 truncate">{sellerCountry}</p>
        </div>

        <div className="card-actions mt-2">
          <div className="badge badge-outline text-xs">{brand}</div>
        </div>

        <div className="mt-2 font-medium text-info">{price}</div>

        <div className="text-sm flex items-center">
          Shippable to
          <div className="flex gap-x-1 mt-1 ml-2">
            {shippableCountries.length > 0 &&
              shippableCountries.map((countryCode, index) => (
                <span key={index}>{getFlagIcon(countryCode)}</span>
              ))}
          </div>
        </div>
        {displayMode === DisplayMode.DISPLAY_DEPOSITED && (
          <div className="card-actions mt-1 text-sm">
            Deposited time
            <div className="badge badge-outline badge-accent text-xs h-auto">
              {getPrettyDateTime(depositedOn || '')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
