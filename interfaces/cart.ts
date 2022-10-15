import { ValidSize } from '.';

export interface ICartProduct {
	_id: string;
	image: string;
	price: number;
	size: ValidSize;
	slug: string;
	title: string;
	gender: 'men' | 'women' | 'kid' | 'unisex';
	quantity: number;
}
