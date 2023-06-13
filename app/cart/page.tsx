import { HiHome } from "react-icons/hi2";
import CartSummary from "./CartSummary";
import Link from "next/link";

const Cart = () => {
  return (
    <>
    
      <div className="flex flex-col items-center justify-center   py-8 px-6 mb-24 bg-white">
        <div className="w-full  rounded-lg shadow-xl sm:max-w-md   p-6">
          <div>
            <h1 className="text-xl text-center my-5  leading-tight tracking-tight text-gray-500 md:text-2xl ">
              Cart
            </h1>
            <Link href={"/"} className="flex  justify-center">
              <button className="bg-slate-200 p-4 rounded-full hover:bg-green-200">
                <HiHome className="hover:text-green-500" size={32} />
              </button>
            </Link>
          </div>

          <div className="flex flex-col space-y-4 border-t">
            <CartSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
