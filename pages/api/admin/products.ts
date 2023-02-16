import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { IProduct } from '../../../interfaces';
import { db } from '../../../database';
import { Product } from '../../../models';

cloudinary.config(process.env.CLOUDINARY_URL || '');

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
	const { images = [] } = req.body as IProduct;

	if (images.length < 2) return res.status(400).json({ message: 'at least 2 images are required' });

	try {
		await db.connect();
		const productInDB = await Product.findOne({ slug: req.body.slug }).lean();

		if (productInDB) {
			await db.disconnect();
			return res.status(400).json({ message: 'Duplicated slug' });
		}

		const product = new Product(req.body);
		product.save();

		await db.disconnect();
		return res.status(201).json(product);
	} catch (error) {
		console.log(error);
		await db.disconnect();
		return res.status(400).json({ message: 'Check logs' });
	}
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { _id = '', images = [] } = req.body as IProduct;

	if (!isValidObjectId(_id)) return res.status(400).json({ message: 'invalid id' });

	if (images.length < 2) return res.status(400).json({ message: 'at least 2 images are required' });

	try {
		await db.connect();

		const product = await Product.findById(_id);

		if (!product) {
			await db.disconnect();
			return res.status(400).json({ message: 'no product found' });
		}

		product.images.forEach(async (image) => {
			if (!images.includes(image)) {
				const [fileId, fileExtension] = image.substring(image.lastIndexOf('/') + 1).split('.');
				console.log({ image, fileExtension, fileId });
				await cloudinary.uploader.destroy(fileId);
			}
		});

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
