export interface Store {
    id: string
    name: string
    image: string
    address: string
    distance: number
    longitude: number
    latitude: number
  }
  
  export type StoresResponse = Store[] | { success: false; error: string }
  
  