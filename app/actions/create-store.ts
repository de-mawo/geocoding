"use server";

import { db } from "@/db";
import { stores } from "@/db/schema";
import { generateRandomStoreName } from "@/lib/generate-store-name";
import { generateUniqueId } from "@/lib/utils";
import { sql } from "drizzle-orm";

export async function saveStore(
  address: string,
  country: string,
  city: string,
  latitude: number,
  longitude: number
) {
  try {
    const id = generateUniqueId();
    const res = await db.insert(stores).values({
      id,
      name: generateRandomStoreName(),
      image: "/store.jpeg",
      address,
      country,
      city,
      location: sql`ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving store:", error);
    return { success: false, error: "Failed to save store" };
  }
}
