import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';

export interface CartContextProps {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	isLoaded: boolean;

	shippingAddress?: ShippingAddress;

	addProductToCart: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
	updateAddress: (address: ShippingAddress) => void;

	createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as CartContextProps);
