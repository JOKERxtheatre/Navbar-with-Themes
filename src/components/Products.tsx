import { useEffect, useState } from "react";
import "@/components/smth.css";

interface Product {
  price: number;
  image: string;
  title: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMaxPrice(parseInt(value));
  };
  const handlePriceChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMinPrice(parseInt(value));
  };

  const getProducts = async () => {
    const result = await fetch("https://fakestoreapi.com/products");
    const AllData = await result.json();
    setProducts(AllData);
    console.log("all Products", AllData);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const filterProduct = products.filter(
    (item) => item.price >= minPrice && item.price <= maxPrice
  );

  return (
    <div className="Products w-full flex flex-col items-center justify-center max-[769px]:mt-32">
      <div className="w-[90%] shadow p-3 mx-auto  flex flex-col">
        <h3 className="font-bold text-xl text-center">All Product list</h3>
        <label htmlFor="customrange1" className="">
          Filter By Price: ${minPrice} - ${maxPrice}
        </label>
        <div className="relative items-center flex w-[30%] max-[769px]:w-[50%] max-[426px]:w-[100%] mt-5">
          <input
            type="range"
            className="absolute appearance-none bg-inherit h-[5px] pointer-events-none w-full z-10"
            id="customrange1"
            min={0}
            max={100}
            value={maxPrice}
            onChange={handlePriceChange}
          />
          <div className="left-[25%] right-[25%] w-full flex">
            <div className="bg-white w-full h-[5px] progress rounded-lg"></div>
          </div>
          <input
            className="absolute appearance-none bg-inherit h-[5px] pointer-events-none w-full z-10"
            type="range"
            id="customrange1"
            min={0}
            max={100}
            value={minPrice}
            onChange={handlePriceChange2}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="grid grid-cols-3 gap-10 mt-10 max-[769px]:grid-cols-1 content-center justify-center w-full px-[5%]">
          {filterProduct.map((res, index) => {
            return (
              <div
                className="col w-full items-center justify-center flex"
                key={index}
              >
                <div className="card w-full bg-base-100 shadow-xl  h-full">
                  <div>
                    <img src={res.image} alt="Shoes" className="" />
                  </div>
                  <div className="card-body justify-end">
                    <h2 className="card-title">{res.title.substring(0, 28)}</h2>
                    <span>{res.price}</span>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
