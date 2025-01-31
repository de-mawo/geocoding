"use server";

import { db } from "@/db";
import { stores } from "@/db/schema";
import { StoresResponse } from "@/types/store";
import { sql, eq } from "drizzle-orm";

export async function getNearestStores(
  latitude: number,
  longitude: number,
  limit = 5,
  maxDistance?: number
): Promise<StoresResponse> {
  try {
    const userLocation = sql`ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)`;

    // Use ST_DistanceSphere for accurate distance calculation in meters
    const baseQuery = db
      .select({
        id: stores.id,
        name: stores.name,
        image: stores.image,
        address: stores.address,
        distance: sql<number>`ST_DistanceSphere(${stores.location}, ${userLocation})::float`,
        longitude: sql<number>`ST_X(${stores.location})::float`,
        latitude: sql<number>`ST_Y(${stores.location})::float`,
      })
      .from(stores);

    const filteredQuery = maxDistance
      ? baseQuery.where(sql`${sql<number>`ST_DistanceSphere(${stores.location}, ${userLocation})`} <= ${maxDistance}`)
      : baseQuery;

    const res = await filteredQuery
      .orderBy(sql`ST_DistanceSphere(${stores.location}, ${userLocation})`)
      .limit(limit);

    return res.map((store) => ({
      ...store,
      distance: Math.round(store.distance), // Distance will now be in meters
    }));
  } catch (error) {
    console.error("Error fetching nearest stores:", error);
    return { success: false, error: "Failed to fetch nearest stores" };
  }
}