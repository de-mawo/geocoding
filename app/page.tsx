import Image from "next/image";
import { getNearestStores } from "@/db/queries/stores";
import type { Store, StoresResponse } from "@/types/store";
import StoreLocator from "../components/common/store-locator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const latitude =
    typeof resolvedSearchParams.latitude === "string"
      ? Number.parseFloat(resolvedSearchParams.latitude)
      : undefined;
  const longitude =
    typeof resolvedSearchParams.longitude === "string"
      ? Number.parseFloat(resolvedSearchParams.longitude)
      : undefined;
  const maxDistance =
    typeof resolvedSearchParams.maxDistance === "string"
      ? Number.parseInt(resolvedSearchParams.maxDistance)
      : 5000;

  let stores: Store[] = [];
  let error: string | null = null;

  if (latitude !== undefined && longitude !== undefined) {
    const response: StoresResponse = await getNearestStores(
      latitude,
      longitude,
      5,
      maxDistance
    );
    if (Array.isArray(response)) {
      stores = response;
    } else {
      error = response.error;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button asChild >
        <Link href="/add" className="flex my-4 text-3xl items-center space-x-2">
          Add Store
        </Link>
      </Button>
      <h1 className="text-2xl font-bold mb-4">Nearby Stores</h1>
      <StoreLocator />
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : stores.length > 0 ? (
        <ul className="space-y-4 w-full max-w-2xl">
          {stores.map((store) => (
            <li
              key={store.id}
              className="border p-4 rounded-md flex items-center space-x-4"
            >
              <div className="flex-shrink-0">
                <Image
                  src={store.image || "/placeholder.svg"}
                  alt={store.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold">{store.name}</h2>
                <p>{store.address}</p>
                <p>Distance: {(store.distance / 1000).toFixed(2)} km</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No stores found nearby. Try adjusting your location or increasing the
          search radius.
        </p>
      )}
    </main>
  );
}
