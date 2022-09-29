import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';

const RegisterPage = () => {
	return (
		<AuthLayout title='Sing Up'>
			<Box sx={{ width: 350, padding: '10px 20px' }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h1' component='h1'>
							Create Account
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField label='Full Name' variant='filled' fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label='Email' variant='filled' fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label='Password' type='password' variant='filled' fullWidth />
					</Grid>
					<Grid item xs={12}>
						<Button color='secondary' className='circular-btn' size='large' fullWidth>
							Sign Up
						</Button>
					</Grid>

					<Grid item xs={12} display='flex' justifyContent='end'>
						<NextLink href='/auth/login' passHref>
							<Link underline='always'>Already have an account?</Link>
						</NextLink>
					</Grid>
				</Grid>
			</Box>
		</AuthLayout>
	);
};

export default RegisterPage;
