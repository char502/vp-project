import React from 'react';
import StarRating from './StarRating';

interface ProductCardProps {
  id: string;
  productName: string;
  prodImage: string;
  altText: string;
  price: number;
  stockStatus?: string;
  averageRating: number | null;
  reviewsCount: number;
  isBestSeller: boolean;
  brandImage: string;
  brandImgAltText: string;
}

export const ProductCardLayout = ({
  id,
  productName,
  prodImage,
  altText,
  price,
  stockStatus,
  averageRating,
  reviewsCount,
  isBestSeller,
  brandImage,
  brandImgAltText,
}: ProductCardProps) => (
  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="relative">
      <img className="w-full object-contain" src={prodImage} alt={altText} />
      {isBestSeller ? (
        <div className="w-full bg-blue-500 bg-opacity-75 text-white text-center absolute bottom-0 z-10">
          Bestseller
        </div>
      ) : null}
    </div>
    <div className="p-4 h-full text-xl text-slate-400">
      <p className="pb-2">
        <img className="w-15 h-5" src={brandImage} alt={brandImgAltText} />
      </p>
      <p className="text-sm font-bold line-clamp-2">{productName}</p>
      <p className="text-lg text-red-600 font-bold">£{price}</p>
      <p className="text-sm font-bold">Stock Status {stockStatus}</p>
      <div className="flex">
        <p className="text-sm font-bold pr-2">
          <StarRating value={averageRating} />
        </p>
        <p className="text-sm">{reviewsCount}</p>
      </div>
    </div>
  </div>
);
