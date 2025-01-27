import { getNearestStores } from "@/db/queries/stores";
import { Store, StoresResponse } from "@/types/store";
import StoreLocator from "./components/store-locator";

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
      10,
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
      <h1 className="text-2xl font-bold mb-4">Nearby Stores</h1>
      <StoreLocator />
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : stores.length > 0 ? (
        <ul className="space-y-4">
          {stores.map((store) => (
            <li key={store.id} className="border p-4 rounded-md">
              <h2 className="font-semibold">{store.name}</h2>
              <p>{store.address}</p>
              <p>Distance: {(store.distance / 1000).toFixed(2)} km</p>
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
