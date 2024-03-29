import { CartState } from './';
import { ICartProduct, ShippingAddress } from '../../interfaces';

type CartActionType =
	| {
			type: '[Cart] - Load Cart from cookies | storage';
			payload: ICartProduct[];
	  }
	| {
			type: '[Cart] - Update Products in Cart';
			payload: ICartProduct[];
	  }
	| {
			type: '[Cart] - Change Product Quantity in Cart';
			payload: ICartProduct;
	  }
	| {
			type: '[Cart] - Remove Product in Cart';
			payload: ICartProduct;
	  }
	| {
			type: '[Cart] - Update Order Summary';
			payload: {
				numberOfItems: number;
				subTotal: number;
				tax: number;
				total: number;
			};
	  }
	| { type: '[Cart] - Load Address From Cookies'; payload: ShippingAddress }
	| { type: '[Cart] - Update Shipping Address'; payload: ShippingAddress }
	| { type: '[Cart] - Order Completed' };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
	switch (action.type) {
		case '[Cart] - Load Cart from cookies | storage':
			return {
				...state,
				isLoaded: true,
				cart: action.payload,
			};

		case '[Cart] - Update Products in Cart':
			return {
				...state,
				cart: [...action.payload],
			};

		case '[Cart] - Change Product Quantity in Cart':
			return {
				...state,
				cart: state.cart.map((product) => {
					if (product._id !== action.payload._id) return product;
					if (product.size !== action.payload.size) return product;

					return action.payload;
				}),
			};

		case '[Cart] - Remove Product in Cart':
			return {
				...state,
				cart: state.cart.filter(
					(product) => !(product._id === action.payload._id && product.size === action.payload.size)
				),
			};

		case '[Cart] - Update Order Summary':
			return {
				...state,
				...action.payload,
			};

		case '[Cart] - Update Shipping Address':
		case '[Cart] - Load Address From Cookies':
			return {
				...state,
				shippingAddress: action.payload,
			};

		case '[Cart] - Order Completed':
			return {
				...state,
				cart: [],
				numberOfItems: 0,
				subTotal: 0,
				tax: 0,
				total: 0,
			};

		default:
			return state;
	}
};
