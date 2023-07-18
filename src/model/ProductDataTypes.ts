export interface Attributes {
  isBestSeller: boolean;
}

export interface Price {
  priceIncTax: number;
}

export interface Image {
  url: string;
  attributes: {
    imageAltText: string;
  };
}

export interface Brand {
  brandImage: {
    attributes: {
      imageAltText: string;
    };
    url: string;
  };
}

export interface ProductData {
  id: string;
  brand: Brand;
  productName: string;
  image: Image;
  altText: string;
  price: Price;
  stockStatus?: string;
  averageRating: number;
  reviewsCount: number;
  attributes: Attributes;
  brandImage: string;
}
