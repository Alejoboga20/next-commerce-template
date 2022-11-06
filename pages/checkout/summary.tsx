import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getToken } from 'next-auth/jwt';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Link,
	Typography,
} from '@mui/material';
import NextLink from 'next/link';
import Cookies from 'js-cookie';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartContext } from '../../context';
import { countries } from '../../utils';

const SummaryPage = () => {
	const [isPosting, setIsPosting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();
	const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

	useEffect(() => {
		if (!Cookies.get('firstName')) {
			router.replace('/checkout/address');
		}
	}, [router]);

	const onCreateOrder = async () => {
		setIsPosting(true);
		const { hasError, message } = await createOrder();

		if (hasError) {
			setIsPosting(false);
			setErrorMessage(message);
			return;
		}

		router.replace(`/orders/${message}`);
	};

	if (!shippingAddress) return <></>;

	const { firstName, lastName, address, address2, city, zip, country, phone } = shippingAddress;

	return (
		<ShopLayout title='Order Summary' pageDescription='Order Summary'>
			<Typography variant='h1' component='h1'>
				Order Summary
			</Typography>

			<Grid container sx={{ mt: 2 }}>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>
								Resume ({numberOfItems} {numberOfItems === 1 ? 'Product' : 'Products'})
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/checkout/address' passHref>
									<Link underline='always'>Edit</Link>
								</NextLink>
							</Box>

							<Typography variant='subtitle1'>Shipping Address</Typography>
							<Typography>
								{firstName} {lastName}
							</Typography>
							<Typography>
								{address} {address2 ? `, ${address2}` : ''}
							</Typography>
							<Typography>
								{city}, {zip}
							</Typography>
							<Typography>{country}</Typography>
							<Typography>{phone}</Typography>

							<Divider />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Edit</Link>
								</NextLink>
							</Box>

							<OrderSummary />

							<Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
								<Button
									fullWidth
									color='secondary'
									className='circular-btn'
									onClick={onCreateOrder}
									disabled={isPosting}
								>
									Confirm Order
								</Button>
								<Chip
									color='error'
									label={errorMessage}
									sx={{ display: errorMessage ? 'flex' : 'none' }}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!session) {
		return {
			redirect: {
				destination: '/auth/login?p=/checkout/summary',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default SummaryPage;
