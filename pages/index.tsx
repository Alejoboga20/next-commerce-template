import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';

const HomePage: NextPage = () => {
	const { products, isLoading, isError } = useProducts('/products');

	return (
		<ShopLayout title='Testlo-Shop - Home' pageDescription='Find the best products'>
			<Typography variant='h1' component='h1'>
				Shop
			</Typography>

			<Typography variant='h2' component='h2' sx={{ mb: 1 }}>
				Products
			</Typography>

			{isLoading ? <h1>Loading...</h1> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default HomePage;
