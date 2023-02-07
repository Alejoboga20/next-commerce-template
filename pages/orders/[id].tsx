import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface OrderPageProps {
	order: IOrder;
}

const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
	const { shippingAddress } = order;
	return (
		<ShopLayout title='Order' pageDescription='Order Summary'>
			<Typography variant='h1' component='h1'>
				Order: {order._id}
			</Typography>

			{order.isPaid ? (
				<Chip
					sx={{ my: 2 }}
					label='Payment Completed'
					variant='outlined'
					color='success'
					icon={<CreditScoreOutlined />}
				/>
			) : (
				<Chip
					sx={{ my: 2 }}
					label='Pending Payment'
					variant='outlined'
					color='error'
					icon={<CreditCardOffOutlined />}
				/>
			)}

			<Grid container sx={{ mt: 2 }} className='fadeIn'>
				<Grid item xs={12} sm={7}>
					<CartList products={order.orderItems} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>
								Resume ({order.numberOfItems} {order.numberOfItems > 1 ? 'products' : 'product'})
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/checkout/address' passHref>
									<Link underline='always'>Edit</Link>
								</NextLink>
							</Box>

							<Typography variant='subtitle1'>Shipping Address</Typography>
							<Typography>
								{shippingAddress.firstName} {shippingAddress.lastName}
							</Typography>
							<Typography>
								{shippingAddress.address} {shippingAddress.address2}
							</Typography>
							<Typography>
								{shippingAddress.city}, {shippingAddress.zip}
							</Typography>
							<Typography>{shippingAddress.country}</Typography>
							<Typography>{shippingAddress.phone}</Typography>

							<Divider />

							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref>
									<Link underline='always'>Edit</Link>
								</NextLink>
							</Box>

							<OrderSummary
								orderValues={{
									numberOfItems: order.numberOfItems,
									subTotal: order.subTotal,
									tax: order.tax,
									total: order.total,
								}}
							/>

							<Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
								{order.isPaid ? (
									<Chip
										sx={{ my: 2 }}
										label='Payment Completed'
										variant='outlined'
										color='success'
										icon={<CreditScoreOutlined />}
									/>
								) : (
									<PayPalButtons
										createOrder={(data, actions) => {
											return actions.order.create({
												purchase_units: [
													{
														amount: {
															value: '1.99',
														},
													},
												],
											});
										}}
										onApprove={(data, actions) => {
											return actions.order!.capture().then((details) => {
												const name = details.payer.name!.given_name;
												alert(`Transaction completed by ${name}`);
											});
										}}
									/>
								)}
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
