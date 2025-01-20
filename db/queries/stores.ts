"use server";

import { db } from "@/db";
import { stores } from "@/db/schema";
import { sql, eq } from "drizzle-orm";

export async function getNearestStores(
  latitude: number,
  longitude: number,
  limit = 5,
  maxDistance?: number
) {
  try {
    const userLocation = sql`ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)`;

    const baseQuery = db
      .select({
        id: stores.id,
        name: stores.name,
        address: stores.address,
        distance: sql<number>`ST_Distance(${stores.location}, ${userLocation})::float`,
      })
      .from(stores);

    const filteredQuery = maxDistance
      ? baseQuery.where(
          sql`ST_DWithin(${stores.location}, ${userLocation}, ${maxDistance})`
        )
      : baseQuery;

    const res = await filteredQuery
      .orderBy(sql`${stores.location} <-> ${userLocation}`)
      .limit(limit);

    return res.map((store) => ({
      ...store,
      distance: Math.round(store.distance), // Round the distance to the nearest meter
    }));
  } catch (error) {
    console.error("Error fetching nearest stores:", error);
    return { success: false, error: "Failed to fetch nearest stores" };
  }
}
