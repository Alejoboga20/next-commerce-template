import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { initialData } from '../database/products';
import { ProductList } from '../components/products';

const Home: NextPage = () => {
	return (
		<ShopLayout title='Testlo-Shop - Home' pageDescription='Find the best products'>
			<Typography variant='h1' component='h1'>
				Shop
			</Typography>

			<Typography variant='h2' component='h2' sx={{ mb: 1 }}>
				Products
			</Typography>

			<ProductList products={initialData.products as any} />
		</ShopLayout>
	);
};

export default Home;
