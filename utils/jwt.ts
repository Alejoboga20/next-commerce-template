import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
	if (!process.env.JWT_SECRET_SEED) throw new Error('No JWT Seed - Check environment variables');

	return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, {
		expiresIn: '1d',
	});
};
