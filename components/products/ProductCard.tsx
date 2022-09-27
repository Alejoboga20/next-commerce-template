import { useMemo, useState } from 'react';
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { IProduct } from '../../interfaces';

export const ProductCard = ({ product }: ProductCardProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const productImage = useMemo(() => {
		return isHovered ? `products/${product.images[1]}` : `products/${product.images[0]}`;
	}, [isHovered, product.images]);

	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	return (
		<Grid item xs={6} sm={4} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<Card>
				<CardActionArea>
					<CardMedia component='img' image={productImage} alt={product.title} className='fadeIn' />
				</CardActionArea>
			</Card>

			<Box sx={{ marginTop: 1 }} className='fadeIn'>
				<Typography fontWeight={700}>{product.title}</Typography>
				<Typography fontWeight={500}>${product.price}</Typography>
			</Box>
		</Grid>
	);
};

interface ProductCardProps {
	product: IProduct;
}
