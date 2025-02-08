import React from "react";
import AddressSearch from "../../components/common/address-search";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddStorePage() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Button asChild >
        <Link href="/" className="flex my-4 text-3xl items-center space-x-2">
          Home Page
        </Link>
      </Button>
      <h1 className="text-4xl font-bold mb-8">Add Store Location </h1>
      <AddressSearch />
    </main>
  );
}
