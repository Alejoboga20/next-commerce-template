import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../database';
import { Product, User } from '../../models';

type Data = {
	message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (process.env.NODE_ENV === 'production') {
		return res.status(401).json({ message: 'Not access to this service' });
	}

	await db.connect();

	await Product.deleteMany();
	await Product.insertMany(seedDatabase.initialData.products);

	await User.deleteMany();
	await User.insertMany(seedDatabase.initialData.users);

	await db.disconnect();

	res.status(200).json({ message: 'Process correctly done' });
}
