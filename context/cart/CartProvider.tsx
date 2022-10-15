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

	const addProductToCart = (product: ICartProduct) => {
		const productInCart = state.cart.some((p) => p._id === product._id);

		if (!productInCart)
			return dispatch({
				type: '[Cart] - Update Products in Cart',
				payload: [...state.cart, product],
			});

		const productInCartWithDifferentSize = state.cart.some(
			(p) => p._id === product._id && p.size === p.size
		);

		if (!productInCartWithDifferentSize)
			return dispatch({
				type: '[Cart] - Update Products in Cart',
				payload: [...state.cart, product],
			});

		const updatedProducts = state.cart.map((p) => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;

			p.quantity += product.quantity;
			return p;
		});

		dispatch({ type: '[Cart] - Update Products in Cart', payload: updatedProducts });
	};

	return (
		<CartContext.Provider value={{ ...state, addProductToCart }}>{children}</CartContext.Provider>
	);
};
interface CartProviderProps {
	children: JSX.Element | JSX.Element[];
}
