import { useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import { IProduct } from '../../interfaces';

export const ProductCard = ({ product }: ProductCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const productImage = useMemo(() => {
		return isHovered ? product.images[1] : product.images[0];
	}, [isHovered, product.images]);

	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	return (
		<Grid item xs={6} sm={4} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<Card>
				<NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
					<Link>
						<CardActionArea>
							{product.inStock === 0 && (
								<Chip
									color='primary'
									label='Not Available'
									sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
								/>
							)}

							<CardMedia
								component='img'
								image={productImage}
								alt={product.title}
								className='fadeIn'
								onLoad={() => setIsImageLoaded(true)}
							/>
						</CardActionArea>
					</Link>
				</NextLink>
			</Card>

			<Box sx={{ marginTop: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
				<Typography fontWeight={700}>{product.title}</Typography>
				<Typography fontWeight={500}>${product.price}</Typography>
			</Box>
		</Grid>
	);
};

interface ProductCardProps {
	product: IProduct;
}
