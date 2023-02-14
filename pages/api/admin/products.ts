import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../interfaces';
import { db } from '../../../database';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data =
	| {
			message: string;
	  }
	| IProduct[]
	| IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);
		case 'POST':
			return createProduct(req, res);
		case 'PUT':
			return updateProduct(req, res);
		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	await db.connect();
	const products = await Product.find().sort({ title: 'asc' }).lean();
	await db.disconnect();

	return res.status(200).json(products);
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	throw new Error('Function not implemented.');
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { _id = '', images = [] } = req.body as IProduct;

	if (!isValidObjectId(_id)) return res.status(400).json({ message: 'invalid id' });

	if (images.length <= 2)
		return res.status(400).json({ message: 'at least 2 images are required' });

	try {
		await db.connect();

		const product = await Product.findById(_id);

		if (!product) {
			await db.disconnect();
			return res.status(400).json({ message: 'no product found' });
		}

		/* TODO: delete imgs in cloudinary */

		await product.update(req.body);
		await product.save();
		await db.disconnect();

		return res.status(201).json(product);
	} catch (error) {
		console.log({ error });
		await db.disconnect();
		return res.status(500).json({ message: 'check logs' });
	}
};
