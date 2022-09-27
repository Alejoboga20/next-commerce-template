import { Card, CardActionArea, CardMedia, Grid } from '@mui/material';
import { IProduct } from '../../interfaces';

export const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<Grid key={product.slug} item xs={6} sm={4}>
			<Card>
				<CardActionArea>
					<CardMedia component='img' image={`products/${product.images[0]}`} alt={product.title} />
				</CardActionArea>
			</Card>
		</Grid>
	);
};

interface ProductCardProps {
	product: IProduct;
}
