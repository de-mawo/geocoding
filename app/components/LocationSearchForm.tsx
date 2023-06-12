import {  useState } from "react";
import { HiMapPin, HiOutlinePencil } from "react-icons/hi2";

const LocationSearchForm = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="mx-8 md:mx-12 mt-12">
      <form className="max-w-6xl mx-auto ">
        <div className="relative">
          {isEditing ? (
            <>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiMapPin
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-700 "
                />
              </div>
              <input
                type="search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 rounded-lg bg-gray-200 outline-none"
                placeholder="Enter your address"
              />
            </>
          ) : (
            <div className="flex flex-col " onClick={() => setIsEditing(true)}>
              <p className="">50 Walter Rd W, Morley WA 6062, Australia</p>
              <button className="px-4 py-1 mt-2 w-24  inline-flex items-center text-green-600 bg-green-200 hover:bg-green-300 border border-green-500 focus-visible:ring-2 rounded-full  ">
                <HiOutlinePencil
                  className="mr-1 -ml-1 w-4 h-4"
                  fill="currentColor"
                />
                Edit
              </button>
            </div>
          )}

                {/* Suggestions Box Here  */}
          <div className="absolute bg-gray-100 w-full shadow-sm">
            <div className="flex items-center justify-between w-full p-1 cursor-pointer hover:bg-gray-200">Suggestions</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LocationSearchForm;
