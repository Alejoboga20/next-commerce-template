import type { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces/products';

const SearchPage: NextPage<SearchPageProps> = ({ products, foundProducts, query }) => {
	return (
		<ShopLayout title='Testlo-Shop - Search' pageDescription='Search Products'>
			<Typography variant='h1' component='h1'>
				Search Products
			</Typography>

			{foundProducts ? (
				<Typography variant='h2' component='h2' sx={{ mb: 1 }}>
					Term: {query}
				</Typography>
			) : (
				<Box display='flex'>
					<Typography variant='h2' component='h2' sx={{ mb: 1 }}>
						Not Products Found
					</Typography>
					<Typography variant='h2' component='h2' sx={{ ml: 1 }} color='secondary'>
						{query}
					</Typography>
				</Box>
			)}

			<ProductList products={products} />
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { query = '' } = params as { query: string };

	if (query.length === 0) {
		return {
			redirect: {
				destination: '/',
				permanent: true,
			},
		};
	}

	let products = await dbProducts.getProductsByTerm(query);
	const foundProducts = products.length >= 1;

	if (!foundProducts) {
		products = await dbProducts.getProductsByTerm('shirt');
	}

	return {
		props: {
			products,
			foundProducts,
			query,
		},
	};
};

export default SearchPage;

interface SearchPageProps {
	products: IProduct[];
	foundProducts: boolean;
	query: string;
}
