import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct, IOrder, IOrderItem, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import { tesloApi } from '../../api';
import axios from 'axios';

export interface CartState {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	isLoaded: boolean;
	shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
	isLoaded: false,
	shippingAddress: undefined,
};

export const CartProvider = ({ children }: CartProviderProps) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		if (Cookie.get('firstName')) {
			const shippingAddress = {
				firstName: Cookie.get('firstName') || '',
				lastName: Cookie.get('lastName') || '',
				address: Cookie.get('address') || '',
				address2: Cookie.get('address2') || '',
				zip: Cookie.get('zip') || '',
				city: Cookie.get('city') || '',
				country: Cookie.get('country') || '',
				phone: Cookie.get('phone') || '',
			};

			dispatch({ type: '[Cart] - Load Address From Cookies', payload: shippingAddress });
		}
	}, []);

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

	const updateAddress = (address: ShippingAddress) => {
		Cookie.set('firstName', address.firstName);
		Cookie.set('lastName', address.lastName);
		Cookie.set('address', address.address);
		Cookie.set('address2', address.address2 || '');
		Cookie.set('zip', address.zip);
		Cookie.set('city', address.city);
		Cookie.set('country', address.country);
		Cookie.set('phone', address.phone);

		dispatch({ type: '[Cart] - Update Shipping Address', payload: address });
	};

	const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
		if (!state.shippingAddress) throw new Error('No Shipping Address Provided');

		const body: IOrder = {
			orderItems: state.cart.map((product) => ({
				...product,
				size: product.size!,
			})),
			shippingAddress: state.shippingAddress,
			numberOfItems: state.numberOfItems,
			subTotal: state.subTotal,
			tax: state.tax,
			total: state.total,
			isPaid: false,
		};

		try {
			const { data } = await tesloApi.post<IOrder>('/orders', body);
			//TODO: Dispatch action
			return {
				hasError: false,
				message: data._id!,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					hasError: true,
					message: error.response?.data.message,
				};
			}

			return {
				hasError: true,
				message: 'Unhandled exception',
			};
		}
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				//Cart
				addProductToCart,
				updateCartQuantity,
				removeCartProduct,
				updateAddress,

				//Orders
				createOrder,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
interface CartProviderProps {
	children: JSX.Element | JSX.Element[];
}
