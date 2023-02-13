import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { User } from '../../../models';
import { IUser } from '../../../interfaces';

const validRoles = ['admin', 'super-user', 'SEO'];

type Data = {
	message: string | { users: IUser[] };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getUsers(req, res);

		case 'PUT':
			return updateUsers(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
	await db.connect();
	const users = await User.find().select('-password').lean();
	await db.disconnect();

	return res.status(200).json({ users });
};

const updateUsers = async (req: NextApiRequest, res: NextApiResponse) => {
	const { userId = '', role = '' } = req.body;

	if (isValidObjectId(userId)) {
		return res.status(400).json({ message: 'Invalud userId' });
	}

	if (!validRoles.includes(role)) {
		return res.status(400).json({ message: 'Role not allowed' });
	}

	await db.connect();
	const user = await User.findById(userId);

	if (!user) return res.status(400).json({ message: 'Invalud userId' });

	user.role = role;
	await user.save();
	await db.disconnect();

	return res.status(201).json({ message: 'User updated' });
};
