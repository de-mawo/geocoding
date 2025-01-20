import { getNearestStores } from "@/db/queries/stores";

export default async function Home() {
  const latitude =  -33.985526843109746 
  const longitude = 18.4661099974163;
  const maxDistance = 1000; // 5000 meters (5 km)
  const stores = await getNearestStores(latitude, longitude, 10, maxDistance);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">Nearby Stores</h1>
      {Array.isArray(stores) ? (
        <ul className="space-y-4">
          {stores.map((store) => (
            <li key={store.id} className="border p-4 rounded-md">
              <h2 className="font-semibold">{store.name}</h2>
              <p>{store.address}</p>
              <p>Distance: {store.distance} meters</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Error: {stores.error}</p>
      )}
    </main>
  );
}
