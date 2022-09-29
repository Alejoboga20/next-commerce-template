import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export const CartList = ({ editable = false }: CartListProps) => {
	return (
		<>
			{productsInCart.map((product) => (
				<Grid container key={product.slug} spacing={2} sx={{ mb: 2 }}>
					<Grid item xs={3}>
						<NextLink href='/product/slug' passHref>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.images[0]}`}
										component='img'
										sx={{ borderRadius: '5px' }}
									/>
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display='flex' flexDirection='column'>
							<Typography variant='body1'>{product.title}</Typography>
							<Typography variant='body1'>
								Size: <strong>M</strong>
							</Typography>

							{editable ? <ItemCounter /> : <Typography variant='h4'>3 Items</Typography>}
						</Box>
					</Grid>
					<Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
						<Typography variant='subtitle1'>${product.price}</Typography>
						{editable && (
							<Button variant='text' color='secondary'>
								Remove
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};

interface CartListProps {
	editable?: boolean;
}