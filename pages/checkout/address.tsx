import { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { countries, jwt } from '../../utils';
import { CartContext } from '../../context';

type FormData = {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
};

const getAddressFromCookies = (): FormData => {
	return {
		firstName: Cookies.get('firstName') || '',
		lastName: Cookies.get('lastName') || '',
		address: Cookies.get('address') || '',
		address2: Cookies.get('address2') || '',
		zip: Cookies.get('zip') || '',
		city: Cookies.get('city') || '',
		country: Cookies.get('country') || '',
		phone: Cookies.get('phone') || '',
	};
};

const AddressPage = () => {
	const { updateAddress } = useContext(CartContext);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ defaultValues: getAddressFromCookies(), mode: 'onTouched' });

	const onSubmit = (data: FormData) => {
		updateAddress(data);
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
