import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
	name: string;
	email: string;
	password: string;
};

const RegisterPage = () => {
	const router = useRouter();
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { registerUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onTouched' });

	const onRegister = async ({ email, name, password }: FormData) => {
		setShowError(false);

		const { hasError, message } = await registerUser(email, password, name);

		if (hasError) {
			setShowError(true);
			setErrorMessage(message!);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
		}

		router.replace('/');
	};

	return (
		<AuthLayout title='Sing Up'>
			<form noValidate onSubmit={handleSubmit(onRegister)}>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' component='h1'>
								Create Account
							</Typography>
							<Chip
								label='Email or Name not available'
								icon={<ErrorOutline />}
								color='error'
								className='fadeIn'
								sx={{ display: showError ? 'flex' : 'none' }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Full Name'
								type='text'
								variant='filled'
								fullWidth
								{...register('name', {
									required: 'Name is Required',
									minLength: { value: 2, message: 'Name should be at least 2 characters long' },
								})}
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Email'
								type='email'
								variant='filled'
								fullWidth
								{...register('email', {
									required: 'Email is Required',
									validate: validations.isEmail,
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Password'
								type='password'
								variant='filled'
								fullWidth
								{...register('password', {
									required: 'Password is Required',
									minLength: { value: 6, message: 'Password should be at least 6 characters long' },
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								color='secondary'
								className='circular-btn'
								size='large'
								fullWidth
								type='submit'
							>
								Sign Up
							</Button>
						</Grid>

						<Grid item xs={12} display='flex' justifyContent='end'>
							<NextLink
								href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
								passHref
							>
								<Link underline='always'>Already have an account?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default RegisterPage;
