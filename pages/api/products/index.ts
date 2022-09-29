import type { NextApiRequest, NextApiResponse } from 'next';
import { db, SHOP_CONSTANTS } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';

type Data =
	| {
			message: string;
	  }
	| { products: IProduct[] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);

		default:
			return res.status(400).json({
				message: 'Bad Request',
			});
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	let condition = {};
	const { gender = 'all' } = req.query;

	if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
		condition = { gender };
	}

	await db.connect();

	const products = await Product.find(condition).select('title images price inStock -_id').lean();

	await db.disconnect();

	return res.status(200).json({ products });
};
