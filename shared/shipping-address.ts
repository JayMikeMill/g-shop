import { Square } from "square"

export type ShippingAddress = {
	firstName: string
	lastName: string
	email: string
	phone: string
	addressLine1: string
	addressLine2?: string
	city: string
	state: string
	postalCode: string
	country: string
}

// Function to map custom ShippingAddress to Square.Address
export const mapToSquareAddress = (addr: ShippingAddress): Square.Address => ({
	addressLine1: addr.addressLine1,
	addressLine2: addr.addressLine2,
	locality: addr.city,
	administrativeDistrictLevel1: addr.state,
	postalCode: addr.postalCode,
	country: addr.country as Square.Country
})