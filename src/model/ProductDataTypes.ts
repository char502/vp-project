export interface Ancestors {
  slug: string;
  externalId: string;
  name: string;
  depth: number;
}

export interface ProductData {
  id: string;
  legacyId: string;
  legacyVariantId: string;
  cultureCode: string;
  isDefaultVariant: boolean;
  sku: string;
  productName: string;
  slug: string;
  averageRating: number | null;
  reviewsCount: number;
  questionsCount: number;
  image: {
    externalId: string;
    url: string;
    priority: number;
    isDefault: boolean;
    attributes: {
      imageAltText: string;
    };
  };
  stockStatus: {
    status: string;
    eta: string | null;
    stockLevel: null;
  };
  price: {
    currencyCode: string;
    wasPriceIncTax: null;
    wasPriceExcTax: null;
    priceIncTax: number;
    priceExcTax: number;
    isOnPromotion: boolean;
    discountPercentage: null;
    monthlyFinanceEstimate: number | null;
  };
  attributes: {
    isApproved: boolean;
    isShownOnTv: boolean;
    isBestSeller: boolean;
    isFreeWaste: boolean;
    isPremium: boolean;
    isRecommended: boolean;
    isTrayIncluded: boolean;
    isBluetoothIncluded: boolean;
    isBatteryIncluded: boolean;
    isAntiSlipIncluded: boolean;
    isShortProjection: boolean;
    hasOneOutlet: boolean;
    hasTwoOutlets: boolean;
    hasThreeOutlets: boolean;
    isNew: boolean;
    hasMoreOptions: boolean;
  };
  defaultCategory: {
    externalId: string;
    slug: string;
    name: string;
    isDefault: boolean;
    ancestors: Ancestors[];
    level: number;
  };
  brand: {
    externalId: string;
    slug: string;
    name: string;
    brandImage: {
      externalId: string;
      url: string;
      priority: number;
      isDefault: boolean;
      attributes: {
        imageAltText: string;
      };
    };
    level: number;
  };
  tradePrices: null;
  variants: null;
  score: number;
}
