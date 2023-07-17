interface SelectProps {
  onSelectChange: () => void;
  setIsLoading: (arg0: boolean) => void;
  setData: (arg0: any) => void;
  setError: (arg0: string) => void;
}

export const Sorting = ({
  onSelectChange,
  setIsLoading,
  setData,
  setError,
}: SelectProps) => {
  // @ts-ignore
  onSelectChange = (e) => {
    const sortDirection = e.target.value;

    if (sortDirection === '1') {
      const getSortedRecommended = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI`,
            {
              method: 'POST',
              body: JSON.stringify({
                query: 'toilets',
                sort: 2,
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
      getSortedRecommended();
    } else if (sortDirection === '2') {
      const getSortedLowToHighPriceData = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI`,
            {
              method: 'POST',
              body: JSON.stringify({
                query: 'toilets',
                sort: 2,
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
      getSortedLowToHighPriceData();
    } else if (sortDirection === '3') {
      const getSortedLowToHighPriceData = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI`,
            {
              method: 'POST',
              body: JSON.stringify({
                query: 'toilets',
                sort: 3,
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
      getSortedLowToHighPriceData();
    } else if (sortDirection === '4') {
      const getSortedHighestDiscount = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI`,
            {
              method: 'POST',
              body: JSON.stringify({
                query: 'toilets',
                sort: 4,
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
      getSortedHighestDiscount();
    }
  };
  return (
    <div className=" bg-white border-gray-400 mt-6 w-56">
      <p className="text-slate-400 text-xs px-1">Sort By</p>
      <select className="w-full h-8" defaultValue={0} onChange={onSelectChange}>
        <option value={1}>Recommended</option>
        <option value={2}>Lowest Price</option>
        <option value={3}>Highest Price</option>
        <option value={4}>Highest Discount</option>
      </select>
    </div>
  );
};

export default Sorting;
