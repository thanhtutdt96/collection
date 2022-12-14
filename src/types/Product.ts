export enum ShippableCountry {
  US = 'US',
  DE = 'DE',
  UK = 'UK',
  GB = 'GB',
}

type Seller = {
  name: string;
  id: number;
  country: string;
};

type Price = {
  currency: string;
  price_in_cents: number;
  price: string;
};

export type Product = {
  id: number;
  name: string;
  brand: string;
  seller: Seller;
  price: Price;
  deposited_on?: string;
  shippable_countries: string[];
  photoUrl: string;
};

export enum DisplayMode {
  OFF_WHITE = 'Off-White',
  LOUIS_VUITTON = 'Louis Vuitton',
  UK_SHIPPABLE = 'UK Shippable',
  DISPLAY_DEPOSITED = 'Display Deposited',
  DEFAULT = 'Default',
}
