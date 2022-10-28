import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { countries, jwt } from '../../utils';

type FormData = {
	firstName: string;
	lastName: string;
	address: string;
	address2: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
};

const initialFormValues = {
	firstName: '',
	lastName: '',
	address: '',
	address2: '',
	zip: '',
	city: '',
	country: countries[0].code,
	phone: '',
};

const AddressPage = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ defaultValues: initialFormValues, mode: 'onTouched' });

	const onSubmit = (data: FormData) => {
		console.log(data);
		Cookies.set('firstName', data.firstName);
		Cookies.set('lastName', data.lastName);
		Cookies.set('address', data.address);
		Cookies.set('address2', data.address2);
		Cookies.set('zip', data.zip);
		Cookies.set('city', data.city);
		Cookies.set('country', data.country);
		Cookies.set('phone', data.phone);
		router.push('/checkout/summary');
	};

	return (
		<ShopLayout title='Address' pageDescription='Confirm Destiny'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography variant='h1' component='h1'>
					Address
				</Typography>

				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Name'
							variant='filled'
							fullWidth
							{...register('firstName', { required: 'Field Required' })}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Lastname'
							variant='filled'
							fullWidth
							{...register('lastName', { required: 'Field Required' })}
							error={!!errors.lastName}
							helperText={errors.lastName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Address'
							variant='filled'
							fullWidth
							{...register('address', { required: 'Field Required' })}
							error={!!errors.address}
							helperText={errors.address?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label='Alt Address' variant='filled' fullWidth {...register('address2')} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Zip-Code'
							variant='filled'
							fullWidth
							{...register('zip', { required: 'Field Required' })}
							error={!!errors.zip}
							helperText={errors.zip?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='City'
							variant='filled'
							fullWidth
							{...register('city', { required: 'Field Required' })}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<TextField
								select
								variant='filled'
								label='Country'
								defaultValue={countries[0].code}
								{...register('country', { required: 'Field Required' })}
								error={!!errors.country}
							>
								{countries.map((country) => (
									<MenuItem value={country.code} key={country.code}>
										{country.name}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Phone'
							variant='filled'
							fullWidth
							{...register('phone', { required: 'Field Required' })}
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					</Grid>
				</Grid>
				<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
					<Button color='secondary' className='circular-btn' size='large' type='submit'>
						Check Order{' '}
					</Button>
				</Box>
			</form>
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
