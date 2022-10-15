import NextLink from 'next/link';
import { useContext } from 'react';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { CartContext } from '../../context';
import { ItemCounter } from '../ui';

export const CartList = ({ editable = false }: CartListProps) => {
	const { cart } = useContext(CartContext);

	return (
		<>
			{cart.map((product) => (
				<Grid container key={product.slug} spacing={2} sx={{ mb: 2 }}>
					<Grid item xs={3}>
						<NextLink href='/product/slug' passHref>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.image}`}
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

							{editable ? (
								<ItemCounter
									currentValue={product.quantity}
									maxValue={10}
									updatedQuantity={() => {}}
								/>
							) : (
								<Typography variant='h4'>
									{product.quantity} {product.quantity > 1 ? 'Products' : 'Product'}
								</Typography>
							)}
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
