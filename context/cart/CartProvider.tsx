import { useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
};
export const CartProvider = ({ children }: CartProviderProps) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	return <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>;
};
interface CartProviderProps {
	children: JSX.Element | JSX.Element[];
}
