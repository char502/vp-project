// @ts-nocheck
import { useEffect, useState } from 'react';
import examplePayload from './component/data/example-payload.json';
import { ProductCardLayout } from './component/ProductCardLayout';
import { Loader } from './component/Loader';
import { ErrorMessage } from './component/data/ErrorMessage';
import { Sorting } from './component/data/Sorting';

interface Attributes {
  isBestSeller: boolean;
}

interface Price {
  priceIncTax: number;
}

interface Image {
  url: string;
  attributes: {
    imageAltText: string;
  };
}

interface Brand {
  brandImage: {
    attributes: {
      imageAltText: string;
    };
    url: string;
  };
}

interface ProductData {
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

export default function App() {
  const productInfo = examplePayload.item.products;
  const [productsObj, setProductsObj] = useState<ProductData>(productInfo);
  const [filtered, setFiltered] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI`,
          {
            method: 'POST',
            body: JSON.stringify({
              query: 'toilets',
              sort: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching products');
        const data = await res.json();
        setData(data.products);
      } catch (err: any | unknown) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (filtered.length > 0) {
      setProductsObj(
        examplePayload.item.products.filter((product) =>
          //@ts-ignore
          filtered.includes(product.brand.name)
        )
      );
    } else {
      setProductsObj(productInfo);
    }
  }, [filtered, productInfo]);

  const handleCheckboxSelect = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      //Add checked item into checkList
      setFiltered([...filtered, value]);
    } else {
      //Remove unchecked item from checkList
      setFiltered(filtered.filter((br) => br !== value));
    }
  };

  // ============ Data for filters ==============
  const brandArray: string[] = productInfo
    .map((product) => product.brand.name)
    .sort();
  const brandArrayNoDups: string[] = [...new Set(brandArray)];

  const count: {} = brandArray.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  return (
    <div className="container grid grid-cols-[max-content_1fr] gap-x-4 bg-[#F2F0EB] mx-auto">
      <div className="p-4">
        <div className="grid w-full grid-cols-1 flex-row justify-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Filter By</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <div className="bg-white">
                <li key="1">
                  <h1 className="text-2xl p-4">Brand</h1>
                  <hr />
                  {brandArrayNoDups.map((item, index) => {
                    const brandCount = count[item];
                    return (
                      <ul>
                        <li key={index} className="px-4 py-2">
                          <h2>
                            <input
                              key={index}
                              type="checkbox"
                              name={item}
                              value={item}
                              onClick={handleCheckboxSelect}
                            />
                            <label className="text-xl pl-2">
                              {item} ({brandCount})
                            </label>
                          </h2>
                        </li>
                      </ul>
                    );
                  })}
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <Sorting
          onchange={onchange}
          setIsLoading={setIsLoading}
          setData={setData}
          setError={setError}
        />

        <div className="grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 flex-row justify-center gap-3">
          {isLoading && <Loader />}
          {!isLoading &&
            !error &&
            data.map((product) => {
              return (
                <div key={product.id} className="rounded-lg p-3 w-full">
                  <ProductCardLayout
                    id={product.id}
                    productName={product.productName}
                    prodImage={product?.image?.url}
                    altText={product?.image?.attributes?.imageAltText}
                    brandImage={product?.brand?.brandImage.url}
                    brandImgAltText={
                      product?.brand?.brandImage?.attributes?.imageAltText
                    }
                    price={product.price.priceIncTax}
                    stockStatus={product.stockStatus.status}
                    averageRating={product.averageRating}
                    reviewsCount={product.reviewsCount}
                    isBestSeller={product?.attributes.isBestSeller}
                  />
                </div>
              );
            })}
          {error && <ErrorMessage message={error} />}
        </div>
      </div>
    </div>
  );
}
