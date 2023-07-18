import { ProductData } from '../../model/ProductDataTypes';

interface SelectProps {
  setIsLoading: (arg0: boolean) => void;
  setData: (arg0: ProductData[]) => void;
  setError: (arg0: string) => void;
}

export const Sorting = ({ setIsLoading, setData, setError }: SelectProps) => {
  const onSelectChange = async (e: { target: { value: string } }) => {
    const sortDirection = e.target.value;
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI`,
        {
          method: 'POST',
          body: JSON.stringify({
            query: 'toilets',
            sort: parseInt(sortDirection),
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

  return (
    <div className=" bg-white border-gray-400 mt-6 w-56">
      <p className="text-slate-400 text-xs px-1">Sort By</p>
      <select className="w-full h-8" defaultValue={0} onChange={onSelectChange}>
        <option value={1}>Recommended</option>
        <option value={2}>Lowest Price</option>
        <option value={3}>Highest Price</option>
        <option value={4}>Largest Discount</option>
      </select>
    </div>
  );
};

export default Sorting;
