import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const MenPage: NextPage = () => {
	const { products, isLoading, isError } = useProducts('/products?gender=men');

	return (
		<ShopLayout title='Testlo-Shop - Man' pageDescription='Find the best products for Man'>
			<Typography variant='h1' component='h1'>
				Shop
			</Typography>

			<Typography variant='h2' component='h2' sx={{ mb: 1 }}>
				Products
			</Typography>

			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default MenPage;
