"use client"

import { MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function StoreLocator() {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [address, setAddress] = useState<string>("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const lat = searchParams.get("latitude")
    const lon = searchParams.get("longitude")
    const addr = searchParams.get("address")

    if (lat && lon) {
      setLocation({
        latitude: Number.parseFloat(lat),
        longitude: Number.parseFloat(lon),
      })
    }

    if (addr) {
      setAddress(decodeURIComponent(addr))
      localStorage.setItem("lastAddress", decodeURIComponent(addr))
    } else {
      const savedAddress = localStorage.getItem("lastAddress")
      if (savedAddress) {
        setAddress(savedAddress)
        getLocation(savedAddress)
      }
    }
  }, [searchParams])

  const getLocation = async (addressToUse: string = address) => {
    setIsLoading(true)
    setError(null)

    if (!addressToUse) {
      setError("Please enter an address")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addressToUse)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
      )
      const data = await response.json()

      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center
        setLocation({ latitude, longitude })
        localStorage.setItem("lastAddress", addressToUse)
        router.push(`/?latitude=${latitude}&longitude=${longitude}&address=${encodeURIComponent(addressToUse)}`)
      } else {
        setError("Unable to find the location")
      }
    } catch (error) {
      setError("An error occurred while fetching the location")
    } finally {
      setIsLoading(false)
      setIsDialogOpen(false)
    }
  }

  const handleAddressChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setAddress(value)

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&autocomplete=true`,
        )
        const data = await response.json()
        setSuggestions(data.features || [])
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
      }
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    setAddress(suggestion.place_name)
    setSuggestions([])
    setIsDialogOpen(false)
    getLocation(suggestion.place_name)
  }

  const handleDistanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const distance = event.target.value
    if (location) {
      router.push(
        `/?latitude=${location.latitude}&longitude=${location.longitude}&address=${encodeURIComponent(address)}&maxDistance=${distance}`,
      )
    }
  }

  return (
    <div className="mb-8 w-full max-w-md">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <MapPin className="mr-2 h-4 w-4" />
            <span className="truncate">{address || "Enter your location"}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter your location</DialogTitle>
          </DialogHeader>
          <div className="relative mt-4">
            <Input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Type your address"
              className="w-full"
            />
            {suggestions?.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button onClick={() => getLocation()} disabled={isLoading} className="mt-4">
            {isLoading ? "Loading..." : "Confirm Location"}
          </Button>
        </DialogContent>
      </Dialog>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {location && (
        <div className="mb-4">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      <select onChange={handleDistanceChange} className="w-full border p-2 rounded-md mt-4">
        <option value="1000">Within 1 km</option>
        <option value="2000">Within 2 km</option>
        <option value="5000">Within 5 km</option>
        <option value="10000">Within 10 km</option>
      </select>
    </div>
  )
}

