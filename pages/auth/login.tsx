import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';

const LoginPage = () => {
	return (
		<AuthLayout title='SingIn'>
			<Box sx={{ width: 350, padding: '10px 20px' }}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='h1' component='h1'>
							Init Session
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField label='Email' variant='filled' fullWidth />
					</Grid>
					<Grid item xs={12}>
						<TextField label='Password' type='password' variant='filled' fullWidth />
					</Grid>
					<Grid item xs={12}>
						<Button color='secondary' className='circular-btn' size='large'>
							SignIn
						</Button>
					</Grid>

					<Grid item xs={12} justifyContent='end'>
						<NextLink href='auth/register' passHref>
							<Link underline='always'>Do not have an account?</Link>
						</NextLink>
					</Grid>
				</Grid>
			</Box>
		</AuthLayout>
	);
};

export default LoginPage;
