import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
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

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface OrderPageProps {
	order: IOrder;
}

const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
	console.log({ order });
	return (
		<ShopLayout title='Order' pageDescription='Order Summary'>
			<Typography variant='h1' component='h1'>
				Order: ABC123
			</Typography>

			{/* <Chip
				sx={{ my: 2 }}
				label='Pending Payment'
				variant='outlined'
				color='error'
				icon={<CreditCardOffOutlined />}
			/> */}

			<Chip
				sx={{ my: 2 }}
				label='Payment Completed'
				variant='outlined'
				color='success'
				icon={<CreditScoreOutlined />}
			/>

			<Grid container sx={{ mt: 2 }}>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>Resume (3 products)</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/checkout/address' passHref>
									<Link underline='always'>Edit</Link>
								</NextLink>
							</Box>

							<Typography variant='subtitle1'>Shipping Address</Typography>
							<Typography>Alejo Boga</Typography>
							<Typography>21 Trimountain Ave</Typography>
							<Typography>South Range, MI 49963</Typography>
							<Typography>United States</Typography>
							<Typography>+ 509 607 5140</Typography>

							<Divider />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Edit</Link>
								</NextLink>
							</Box>

							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								<h1>Pay</h1>
								<Chip
									sx={{ my: 2 }}
									label='Payment Completed'
									variant='outlined'
									color='success'
									icon={<CreditScoreOutlined />}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const { id = '' } = query;
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: `/auth/login?p=/orders/${id}`,
				permanent: false,
			},
		};
	}

	const order = await dbOrders.getOrderById(id.toString());
	if (!order) {
		return {
			redirect: {
				destination: '/orders/history',
				permanent: false,
			},
		};
	}

	if (order.user !== session.user._id) {
		return {
			redirect: {
				destination: '/orders/history',
				permanent: false,
			},
		};
	}

	return {
		props: {
			order,
		},
	};
};

export default OrderPage;
