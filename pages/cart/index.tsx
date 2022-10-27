import { useContext, useEffect } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';

const CartPage = () => {
	const router = useRouter();
	const { isLoaded, cart } = useContext(CartContext);

	useEffect(() => {
		if (isLoaded && cart.length === 0) {
			router.replace('/cart/empty');
		}
	}, [isLoaded, cart, router]);

	if (!isLoaded || cart.length === 0) return <></>;

	return (
		<ShopLayout title='Shopping Cart' pageDescription='Shopping Cart'>
			<Typography variant='h1' component='h1'>
				Shopping Cart
			</Typography>

			<Grid container sx={{ mt: 2 }}>
				<Grid item xs={12} sm={7}>
					<CartList editable />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>Order</Typography>
							<Divider sx={{ my: 1 }} />
							<OrderSummary />

							<Box sx={{ mt: 3 }}>
								<Button color='secondary' className='circular-btn' fullWidth>
									Checkout
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default CartPage;
