import { useEffect, useState } from 'react';
import examplePayload from './component/data/example-payload.json';
import { ProductCardLayout } from './component/ProductCardLayout';
import { Loader } from './component/Loader';
import { ErrorMessage } from './component/data/ErrorMessage';
import { Sorting } from './component/data/Sorting';
import { ProductData } from './model/ProductDataTypes';

export default function App() {
  const productInfo = examplePayload.item.products;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<ProductData[]>([]);

  const [count, setCount] = useState<number>(0);

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
              pageNumber: 0,
              size: 5,
              additionalPages: 0,
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
      } catch (err: any | string) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  // Pagination not quite right,
  // Works on first click (loads current items then next 5 items)
  // Doesn't work on next two clicks (keeps loading the same 10 items with no additions)
  // Then works fine (loading 5 additional items - in addition to currently displayed items)

  const handleNextPageClick = async () => {
    setCount((prevCount) => prevCount + 1);

    try {
      setIsLoading(true);
      const res = await fetch(
        `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI`,
        {
          method: 'POST',
          body: JSON.stringify({
            query: 'toilets',
            pageNumber: count,
            size: 5,
            additionalPages: 1,
            sort: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      if (!res.ok)
        throw new Error('Something went wrong with fetching products');

      const pagData = await res.json();
      const final: ProductData[] = pagData.products;

      // combine current state and new value
      let comb = [...data, ...final];

      // remove duplicates
      let newOb: Record<string, boolean> = {};

      const unique = comb.filter(
        (obj) => !newOb[obj.id] && (newOb[obj.id] = true)
      );

      // set new page to state
      setData(unique);
    } catch (err: any | string) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ============ Data for filters ==============
  const brandArray: string[] = productInfo
    .map((product) => product.brand.name)
    .sort();
  const brandArrayNoDups: string[] = [...new Set(brandArray)];
  // ============ Data for filters ==============

  return (
    <div className="container grid grid-cols-[max-content_1fr] gap-x-4 bg-[#F2F0EB] mx-auto mb-6">
      <div className="p-4">
        <div className="grid w-full grid-cols-1 flex-row justify-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Brands</h2>
          </div>
          <div className="flex-1">
            <div className="pt-2 pb-4 space-y-1 text-sm">
              <div className="bg-white">
                <h1 className="text-2xl p-4">Available Brands</h1>
                <hr />
                <ul>
                  {brandArrayNoDups.map((item, index) => {
                    return (
                      <li key={item} className="px-4 py-2">
                        <h2>
                          <label className="text-xl pl-2">{item}</label>
                        </h2>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Sorting
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
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-slate-500 text-white  px-6 py-4"
            onClick={handleNextPageClick}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
