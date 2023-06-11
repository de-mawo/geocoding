"use client";

import Link from "next/link";
import { HiBars3, HiOutlineShoppingCart } from "react-icons/hi2";

import LocationBtn from "./LocationBtn";

const Header = () => {
  return (
    <>
      <header className="grid grid-cols-2 py-5 px-4 md:px-12 items-center sticky top-0 z-10 bg-white">
        {/* Left Area  */}
        <div className="flex items-center gap-x-8  ">
          <button className="p-2 rounded-full bg-slate-200 text-gray-500 hover:bg-green-200 hover:text-green-600">
            <HiBars3 className="h-8 w-8 cursor-pointer shrink-0 " />
          </button>
          <LocationBtn />
        </div>

        {/* Right Area */}
        <div className="hidden md:flex items-center justify-end space-x-4">
          <Link
            href="/cart"
            className="flex relative p-2 bg-slate-200 rounded-full text-gray-500 hover:bg-green-200 hover:text-green-600"
          >
            <HiOutlineShoppingCart className="h-7 w-7 pr-1 " />{" "}
            <span className="absolute top-0 right-1 font-bold text-green-600">
              {0}{" "}
            </span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
