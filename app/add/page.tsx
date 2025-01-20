import React from "react";
import AddressSearch from "../components/address-search";

export default function AddStorePage() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl font-bold mb-8">Store Location Search</h1>
      <AddressSearch />
    </main>
  );
}
