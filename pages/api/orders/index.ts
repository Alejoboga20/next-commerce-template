import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { IOrder } from '../../../interfaces';
import { connect } from '../../../database/db';
import { db } from '../../../database';
import { Product } from '../../../models';

type Data = {
	message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return createOrder(req, res);
		default:
			res.status(400).json({ message: 'Bad Request' });
	}
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { orderItems, total } = req.body as IOrder;

	//Verify user session
	const session = await getSession({ req });
	if (!session) return res.status(401).json({ message: 'Not Authenticated' });

	const productsIds = orderItems.map((product) => product._id);

	await db.connect();
	const dbProducts = await Product.find({ _id: { $in: productsIds } }).lean();

	try {
		const subTotal = orderItems.reduce((prev, current) => {
			const currentPrice = dbProducts.find((prod) => prod._id === current._id)!.price;
			if (!currentPrice) throw new Error('Verify Cart, Product does not exist');

			return currentPrice * current.quantity + prev;
		}, 0);
	} catch (error) {}

	return res.status(201).json(dbProducts);
};
