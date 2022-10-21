import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data =
	| {
			message: string;
	  }
	| {
			token: string;
			user: { name: string; email: string; role: 'admin' | 'client' };
	  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return registerUser(req, res);

		default:
			res.status(400).json({ message: 'Bad Request' });
	}
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email = '', password = '', name = '' } = req.body;

	if (password.length < 6)
		return res.status(400).json({ message: 'Password should be at least 6 characters long' });

	if (name.length < 2)
		return res.status(400).json({ message: 'Name should be at least 2 characters long' });

	/* TODO: validate email */
	await db.connect();
	const user = await User.findOne({ email }).lean();

	if (user) {
		await db.disconnect();
		return res.status(400).json({ message: 'Email Already taken' });
	}

	const newUser = new User({
		email: email.toLocaleLowerCase(),
		password: bcrypt.hashSync(password),
		role: 'client',
		name,
	});

	try {
		await newUser.save({ validateBeforeSave: true });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}

	const { _id, role } = newUser;
	const token = jwt.signToken(_id, email);

	return res.status(200).json({ token, user: { name, role, email } });
};
