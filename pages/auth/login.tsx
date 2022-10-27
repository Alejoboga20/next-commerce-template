import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const router = useRouter();
	const { loginUser } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onTouched' });
	const [showError, setShowError] = useState(false);

	const onLoginUser = async ({ email, password }: FormData) => {
		setShowError(false);

		const isValidLogin = await loginUser(email, password);

		if (!isValidLogin) {
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);

			return;
		}

		const destination = router.query.p?.toString() || '/';
		router.replace(destination);
	};

	return (
		<AuthLayout title='SingIn'>
			<form onSubmit={handleSubmit(onLoginUser)} noValidate>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' component='h1'>
								Init Session
							</Typography>

							<Chip
								label='Email or Password invalid'
								icon={<ErrorOutline />}
								color='error'
								className='fadeIn'
								sx={{ display: showError ? 'flex' : 'none' }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register('email', {
									required: 'Email is Required',
									validate: validations.isEmail,
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
								type='email'
								label='Email'
								variant='filled'
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register('password', {
									required: 'Password is Required',
									minLength: { value: 6, message: 'Password should be at least 6 characters long' },
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
								label='Password'
								type='password'
								variant='filled'
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								color='secondary'
								className='circular-btn'
								size='large'
								fullWidth
								type='submit'
								disabled={showError}
							>
								Sign In
							</Button>
						</Grid>

						<Grid item xs={12} display='flex' justifyContent='end'>
							<NextLink
								href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
								passHref
							>
								<Link underline='always'>Do not have an account?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
