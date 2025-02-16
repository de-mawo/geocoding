import React from "react";
import AddressSearch from "../../components/common/address-search";
import Link from "next/link";

export default function AddStorePage() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Link href="/" className="flex my-4 text-3xl items-center space-x-2 hover:underline">
       Go to Home Page
      </Link>

      <h1 className="text-4xl font-bold mb-8">Add Store Location </h1>
      <AddressSearch />
    </main>
  );
}
