"use client";

import { useState } from "react";

import CartList from "./CartList";
import LocationBtn from "../components/LocationBtn";

const CartSummary = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [note, setNote] = useState("");
  //   const customer_name =  'De Mawo'
  //   const customer_email = 'de@mawo.com'
  //   const customer_phone = "+4631487952";
  //   const delivery_address = "243/253 Walter Rd W, Morley WA 6062, Australia";
  const serviceFee = 6;
  const deliveryFee = 3;
  const discount = 2;
  const Fees = serviceFee + deliveryFee;
  const total = Fees + (subTotal - discount);

  return (
    <>
      <div className=" border-gray-200 py-2">
        <>
          <CartList />
          <div className="px-4 sm:px-6 lg:px-8 mt-2">
            <div className="border-t border-gray-200 py-4">
              <h2 className="text-lg leading-6 my-4 font-medium text-gray-900">
                Delivery Address
              </h2>
              <LocationBtn />
            </div>
          </div>
          <form>
            <div className="px-4 sm:px-6 lg:px-8 mt-2">
              <h2 className="text-lg leading-6 my-4 font-medium text-gray-900">
                Cart Summary
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Review your order details and then pay securely with Stripe
              </p>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 mt-2">
              <div className="border-t border-gray-200 py-4">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 ">
                  <div className="">
                    <dt className="text-sm font-medium text-gray-500">
                      Subtotal
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      $ {subTotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-sm font-medium text-gray-500">
                      Discount
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      -$ {discount.toFixed(2)}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-sm font-medium text-gray-500">
                      Service Fee
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      $ {serviceFee.toFixed(2)}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-sm font-medium text-gray-500">
                      Delivery Fee
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      $ {deliveryFee.toFixed(2)}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-sm font-medium text-gray-500">Total</dt>
                    <dd className="mt-1 text-lg font-semibold text-green-700">
                      $ {total.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 mt-2">
              <div className="border-t border-gray-200 py-4">
                <h2 className="text-lg leading-6 font-medium text-gray-500">
                  Add a Note
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Optional</p>
                <div className="mt-2">
                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    className="w-full h-16 rounded bg-green-50 border border-green-500 focus:border-green-500  focus:outline-none focus-visible:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </form>
        </>

        <>
          <div className="sm:col-span-1 my-4">
            <div className="flex items-center justify-end">
              <dt className="pr-1 text-lg font-medium text-gray-500">Total:</dt>
              <dd className="pl-1 text-lg font-semibold text-green-700">
                $ {total.toFixed(2)}
              </dd>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 mt-2">
            <div className="flex justify-end">
              <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Pay Now
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default CartSummary;
