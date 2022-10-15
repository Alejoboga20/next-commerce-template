import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

export interface CartContextProps {
	cart: ICartProduct[];
	addProductToCart: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);
