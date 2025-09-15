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
	    country: String
    };
}