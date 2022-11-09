import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { IOrder } from '../../../interfaces';
import { db } from '../../../database';
import { Order, Product } from '../../../models';

type Data =
	| {
			message: string;
	  }
	| IOrder;

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
	const dbProducts = await Product.find({ _id: { $in: productsIds } });

	try {
		const subTotal = orderItems.reduce((prev, current) => {
			const currentPrice = dbProducts.find((prod) => prod.id === current._id)?.price;

			if (!currentPrice) throw new Error('Verify Cart, Product does not exist');

			return currentPrice * current.quantity + prev;
		}, 0);

		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
		const backendTotal = subTotal * (taxRate + 1);

		if (Math.round(total) !== Math.round(backendTotal)) throw new Error('Total does not match');

		const userId = session.user._id;
		const body = { ...req.body, orderItems: orderItems.map((item) => ({ ...item, id: item._id })) };
		const newOrder = new Order({ ...body, isPaid: false, user: userId });
		await newOrder.save();

		return res.status(201).json(newOrder);
	} catch (error: any) {
		await db.disconnect();

		res.status(400).json({ message: error.message || '' });
	}
};
