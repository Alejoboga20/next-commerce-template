import { ICartProduct } from '../../interfaces';
import { CartState } from './';

type CartActionType =
	| {
			type: '[Cart] - Load Cart from cookies | storage';
			payload: ICartProduct[];
	  }
	| {
			type: '[Cart] - Update Products in Cart';
			payload: ICartProduct[];
	  };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
	switch (action.type) {
		case '[Cart] - Load Cart from cookies | storage':
			return {
				...state,
				cart: action.payload,
			};

		case '[Cart] - Update Products in Cart':
			return {
				...state,
				cart: [...action.payload],
			};

		default:
			return state;
	}
};
