export interface Store {
  _id: string
  name: string
  slug: string
  description: string
  logo?: { url: string }
  banner?: { url: string }
  address: string
  city: string
  storeStatus: string
}