import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	isLoaded: boolean;
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
	isLoaded: false,
};

export const CartProvider = ({ children }: CartProviderProps) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		const cartFromCookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
		dispatch({ type: '[Cart] - Load Cart from cookies | storage', payload: cartFromCookies });
	}, []);

	useEffect(() => {
		const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
		const subTotal = state.cart.reduce(
			(prev, current) => current.price * current.quantity + prev,
			0
		);
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
		const tax = subTotal * taxRate;
		const total = subTotal + tax;

		const orderSummary = {
			numberOfItems,
			subTotal,
			tax,
			total,
		};
		dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
	}, [state.cart]);

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

		if (productInCartWithDifferentSize) {
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

	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Remove Product in Cart', payload: product });
		Cookie.set(
			'cart',
			JSON.stringify(state.cart.filter((p) => !(p._id === product._id && p.size === product.size)))
		);
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				addProductToCart,
				updateCartQuantity,
				removeCartProduct,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
interface CartProviderProps {
	children: JSX.Element | JSX.Element[];
}
