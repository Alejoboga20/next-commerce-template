import { Grid } from '@mui/material';
import { IProduct } from '../../interfaces';
import { ProductCard } from './ProductCard';

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<Grid container spacing={4}>
			{products.map((product) => (
				<ProductCard key={product.slug} product={product} />
			))}
		</Grid>
	);
};

interface ProductListProps {
	products: IProduct[];
}
