import { GetServerSideProps } from 'next';
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { jwt } from '../../utils';

const AddressPage = () => {
	return (
		<ShopLayout title='Address' pageDescription='Confirm Destiny'>
			<Typography variant='h1' component='h1'>
				Address
			</Typography>

			<Grid container spacing={2} sx={{ mt: 2 }}>
				<Grid item xs={12} sm={6}>
					<TextField label='Name' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Lastname' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Address' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Alt Address' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Zip-Code' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='City' variant='filled' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Select variant='filled' label='Country' value={1}>
							<MenuItem value={1}>United States</MenuItem>
							<MenuItem value={2}>Canada</MenuItem>
							<MenuItem value={3}>Mexico</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label='Phone' variant='filled' fullWidth />
				</Grid>
			</Grid>

			<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
				<Button color='secondary' className='circular-btn' size='large'>
					Check Order{' '}
				</Button>
			</Box>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { token = '' } = req.cookies;

	let isValidToken = false;

	try {
		await jwt.isValidToken(token);
		isValidToken = true;
	} catch (error) {
		isValidToken = false;
	}

	if (!isValidToken) {
		return {
			redirect: {
				destination: '/auth/login?p=/checkout/address',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default AddressPage;
