import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../database/db';
import { Order, User, Product } from '../../../models';
import { db } from '../../../database';

type Data = {
	numberOfOrders: number;
	paidOrders: number; // isPaid: true
	notpaidOrders: number;
	numberOfClients: number; // role: client
	numberOfProducts: number;
	productsWithNoInventory: number; // 0
	lowInventory: number; // 10 or less products
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await db.connect();

	const [
		numberOfOrders,
		paidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
	] = await Promise.all([
		Order.count(),
		Order.find({ isPaid: true }).count(),
		User.find({ role: 'client' }).count(),
		Product.count(),
		Product.find({ inStock: 0 }).count(),
		Product.find({ inStock: { $lte: 10 } }).count(),
	]);

	const notpaidOrders = numberOfOrders - paidOrders;

	await db.disconnect();

	res.status(200).json({
		numberOfOrders,
		paidOrders,
		notpaidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
	});
}
