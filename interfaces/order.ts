import { IUser, ValidSize } from './';

export interface IOrder {
	_id?: string;
	user?: IUser | string;
	orderItems: IOrderItem[];
	shippingAddress: ShippingAddress;
	paymentResult?: string;
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	isPaid: boolean;
	paidAt?: string;
	transactionId?: string;
}

export interface IOrderItem {
	_id: string;
	title: string;
	gender: 'men' | 'women' | 'kid' | 'unisex';
	size: ValidSize;
	quantity: number;
	slug: string;
	image: string;
	price: number;
}

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
}
