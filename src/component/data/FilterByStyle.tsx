import React from 'react';

// interface Price {
//   priceIncTax: number;
// }

// type StatusOptions = 'G' | 'E';

// interface StatusOfStock {
//   status: StatusOptions;
//   eta: string;
//   stockLevel: null;
// }

// interface ImageData {
//   ImageData:
// }

interface ProductCardProps {
  id: string;
  productName: string;
  prodImage: string;
  altText: string;
  price?: number;
  stockStatus?: string;
  averageRating?: number | null;
}

export const ProductCardLayout = ({
  id,
  productName,
  prodImage,
  altText,
  price,
  stockStatus,
  averageRating,
}: ProductCardProps) => (
  <div className="bg-gray-200 mt-6" key={id}>
    <img src={prodImage} alt={altText} />
    <p className="text-sm font-bold">{productName}</p>
    <p className="text-lg text-red-600 font-bold">£{price}</p>
    <p className="text-sm font-bold">{stockStatus}</p>
    <p className="text-sm font-bold">{averageRating}</p>
  </div>
);
