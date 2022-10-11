import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const SearchPage: NextPage = () => {
	const { products, isLoading } = useProducts('/search/cybertruck');

	return (
		<ShopLayout title='Testlo-Shop - Search' pageDescription='Search Products'>
			<Typography variant='h1' component='h1'>
				Search Products
			</Typography>

			<Typography variant='h2' component='h2' sx={{ mb: 1 }}>
				Products
			</Typography>

			{isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
		</ShopLayout>
	);
};

export default SearchPage;
