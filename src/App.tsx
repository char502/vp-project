import { useEffect, useState } from 'react';
import examplePayload from './component/data/example-payload.json';
import { ProductCardLayout } from './component/ProductCardLayout';

export default function App() {
  const productInfo = examplePayload.item.products;
  const [productsObj, setProductsObj] = useState(productInfo);
  const [filtered, setFiltered] = useState([]);

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

  // @ts-ignore
  const onSelectChange = (e) => {
    const sortDirection = e.target.value;

    // 2 is low to high
    if (sortDirection === '2') {
      const sortedLowToHigh = [...productsObj].sort(
        (a, b) => a.price.priceIncTax - b.price.priceIncTax
      );
      setProductsObj(sortedLowToHigh);
    } else if (sortDirection === '3') {
      const sortedHighToLow = [...productsObj].sort(
        (a, b) => b.price.priceIncTax - a.price.priceIncTax
      );
      setProductsObj(sortedHighToLow);
    }
  };

  //@ts-ignore
  const handleCheckboxSelect = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      //Add checked item into checkList
      //@ts-ignore
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

  // console.log(brandArr);

  const count: {} = brandArray.reduce(function (acc, curr) {
    // @ts-ignore
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
                    // @ts-ignore
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
        <div className=" bg-white border-gray-400 mt-6 w-56">
          <p className="text-slate-400 text-xs px-1">Sort By</p>
          <select
            className="w-full h-8"
            defaultValue={0}
            onChange={onSelectChange}
          >
            <option value={1}>Recommended</option>
            <option value={2}>Lowest Price</option>
            <option value={3}>Highest Price</option>
            {/* <option value={4}>Highest Discount</option> */}
          </select>
        </div>

        <div className="grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 flex-row justify-center gap-3">
          {productsObj.map((product) => {
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
        </div>
      </div>
    </div>
  );
}
