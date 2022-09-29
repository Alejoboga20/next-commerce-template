export interface IProduct {
	_id: string;
	description: string;
	images: string[];
	inStock: number;
	price: number;
	sizes: ValidSize[];
	slug: string;
	tags: string[];
	title: string;
	type: ValidType;
	gender: 'men' | 'women' | 'kid' | 'unisex';

	/* TODO: add createdAt and updatedAt */
}

export type ValidSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidType = 'shirts' | 'pants' | 'hoodies' | 'hats';
