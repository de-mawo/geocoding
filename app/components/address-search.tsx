"use client";

import { useState } from "react";
import { saveStore } from "../actions/create-store";

export default function AddressSearch() {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 2) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&autocomplete=true`
      );
      const data = await response.json();
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setAddress(suggestion.place_name);
    setSuggestions([]);

    const country =
      suggestion.context.find((c: any) => c.id.startsWith("country"))?.text ||
      "";
    const city =
      suggestion.context.find((c: any) => c.id.startsWith("place"))?.text || "";

    setSelectedPlace({
      address: suggestion.place_name,
      country,
      city,
      longitude: suggestion.center[0],
      latitude: suggestion.center[1],
    });
  };

  const handleSaveStore = async () => {
    if (selectedPlace) {
      const result = await saveStore(
        selectedPlace.address,
        selectedPlace.country,
        selectedPlace.city,
        selectedPlace.latitude,
        selectedPlace.longitude
      );
      console.log(result);

      if (result.success) {
        alert("Store saved successfully!");
        setAddress("");
        setSelectedPlace(null);
      } else {
        alert("Failed to save store. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter store address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedPlace && (
        <div className="mb-4">
          <h3 className="font-bold">Selected Place:</h3>
          <p>Name: {selectedPlace.name}</p>
          <p>Address: {selectedPlace.address}</p>
          <p>Country: {selectedPlace.country}</p>
          <p>City: {selectedPlace.city}</p>
          <p>Latitude: {selectedPlace.latitude}</p>
          <p>Longitude: {selectedPlace.longitude}</p>
        </div>
      )}
      <button
        onClick={handleSaveStore}
        disabled={!selectedPlace}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        Save Store
      </button>
    </div>
  );
}
