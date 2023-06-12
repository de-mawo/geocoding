"use client";

import { Fragment, useState } from "react";
import { HiMapPin } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import LocationSearchForm from "./LocationSearchForm";

const LocationBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChange, setShowChange] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setShowChange(false);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`flex items-center px-4 py-2 bg-slate-200 rounded-full md:max-w-sm  md:rounded-lg`}
      >
        {" "}
        <HiMapPin className="shrink-0 text-green-600" />{" "}
        <span className="h-2 w-2 mx-2 bg-gray-600 shrink-0 rounded-full hidden md:block ">
          {" "}
        </span>{" "}
        <span
          className={
            "truncate max-w-[8rem]  text-sm text-gray-500 md:max-w-[12rem]"
          }
        >
          Enter Delivery Address
        </span>
        <FaChevronRight className=" shrink-0 text-green-600" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delivery Address
                  </Dialog.Title>

                  {showChange ? (
                    <div className="mt-2">
                      <LocationSearchForm />
                    </div>
                  ) : (
                    <div className="flex items-center mt-8 justify-between">
                      <div>
                        <p className="truncate max-w-[10rem] md:max-w-xs">
                          Click change...
                        </p>
                      </div>

                      <div>
                        {" "}
                        <button
                          className="px-4 py-1 text-slate-600 bg-green-100 hover:bg-green-200 border border-green-500  rounded-full"
                          onClick={() => setShowChange(true)}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-12 mx-12">
                    <button
                      type="submit"
                      className="px-4 py-1 w-full text-white bg-green-600 hover:bg-green-500 border border-green-600  rounded-full"
                      onClick={closeModal}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LocationBtn;
