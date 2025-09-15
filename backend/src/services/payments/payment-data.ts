import { Square } from "square";

// Function to map custom ShippingAddress to Square.Address
export const mapToSquareAddress = (addr: any): Square.Address => ({
	addressLine1: addr.addressLine1,
	addressLine2: addr.addressLine2,
	locality: addr.city,
	administrativeDistrictLevel1: addr.state,
	postalCode: addr.postalCode,
	country: addr.country as Square.Country
})

export type PaymentData = {
    nonce: string;
    amount: number;
    
    items: { 
        name: string; 
        price: number; 
        quantity: number 
    }[];

    shipping: {
        addressLine1: String,
	    addressLine2: String,
	    locality: String,
	    administrativeDistrictLevel1: String,
	    postalCode: String,
	    country: String | Square.Country
    };
}