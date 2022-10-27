import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

export interface CartContextProps {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	isLoaded: boolean;

	addProductToCart: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);
