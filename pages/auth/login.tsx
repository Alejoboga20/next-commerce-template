import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';
import { useForm } from 'react-hook-form';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onLoginUser = (data: FormData) => {
		console.log({ data });
	};

	return (
		<AuthLayout title='SingIn'>
			<form onSubmit={handleSubmit(onLoginUser)}>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' component='h1'>
								Init Session
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register('email')}
								type='email'
								label='Email'
								variant='filled'
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register('password')}
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
							>
								Sign In
							</Button>
						</Grid>

						<Grid item xs={12} display='flex' justifyContent='end'>
							<NextLink href='/auth/register' passHref>
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
