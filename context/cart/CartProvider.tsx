import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

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

	useEffect(() => {
		const cartFromCookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
		dispatch({ type: '[Cart] - Load Cart from cookies | storage', payload: cartFromCookies });
	}, []);

	const addProductToCart = (product: ICartProduct) => {
		const productInCart = state.cart.some((p) => p._id === product._id);

		if (!productInCart) {
			dispatch({
				type: '[Cart] - Update Products in Cart',
				payload: [...state.cart, product],
			});
			Cookie.set('cart', JSON.stringify([...state.cart, product]));

			return;
		}

		const productInCartWithDifferentSize = state.cart.some(
			(p) => p._id === product._id && p.size === p.size
		);

		if (!productInCartWithDifferentSize) {
			dispatch({
				type: '[Cart] - Update Products in Cart',
				payload: [...state.cart, product],
			});
			Cookie.set('cart', JSON.stringify([...state.cart, product]));

			return;
		}

		const updatedProducts = state.cart.map((p) => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;

			p.quantity += product.quantity;
			return p;
		});

		dispatch({ type: '[Cart] - Update Products in Cart', payload: updatedProducts });
		Cookie.set('cart', JSON.stringify(updatedProducts));
	};

	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Change Product Quantity in Cart', payload: product });
	};

	return (
		<CartContext.Provider value={{ ...state, addProductToCart, updateCartQuantity }}>
			{children}
		</CartContext.Provider>
	);
};
interface CartProviderProps {
	children: JSX.Element | JSX.Element[];
}
