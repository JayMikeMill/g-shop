import { Address } from "./shipping-info";

export type PaymentData = {
    nonce: string;
    amount: number;
    
    items: { 
        name: string; 
        price: number; 
        quantity: number 
    }[];

    address: Address;
}