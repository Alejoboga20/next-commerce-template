import { useContext, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { ICartProduct, IProduct, ValidSize } from '../../interfaces';
import { dbProducts } from '../../database';

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
	const { addProductToCart } = useContext(CartContext);
	const router = useRouter();
	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		image: product.images[0],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 1,
	});

	const onSelectedSize = (size: ValidSize) => {
		setTempCartProduct({ ...tempCartProduct, size });
	};

	const onUpdatedQuantity = (newQuantity: number) => {
		setTempCartProduct({ ...tempCartProduct, quantity: newQuantity });
	};

	const onAddProduct = () => {
		if (!tempCartProduct.size) return;

		addProductToCart(tempCartProduct);
		router.push('/cart');
	};

	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={7}>
					<ProductSlideshow images={product.images} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Box display='flex' flexDirection='column'>
						<Typography variant='h1' component='h1'>
							{product.title}
						</Typography>
						<Typography variant='subtitle1' component='h2'>
							${product.price}
						</Typography>

						<Box sx={{ my: 2 }}>
							<Typography variant='subtitle2'>In Stock</Typography>
							<ItemCounter
								currentValue={tempCartProduct.quantity}
								maxValue={product.inStock}
								updatedQuantity={onUpdatedQuantity}
							/>
							<SizeSelector
								selectedSize={tempCartProduct.size}
								sizes={product.sizes}
								onSelectedSize={onSelectedSize}
							/>
						</Box>

						{product.inStock > 0 ? (
							<Button color='secondary' className='circular-btn' onClick={onAddProduct}>
								{tempCartProduct.size ? 'Add to Cart' : 'Select a Size'}
							</Button>
						) : (
							<Chip label='Unavailable' color='error' variant='outlined' />
						)}
						<Box sx={{ mt: 3 }}>
							<Typography variant='subtitle2'>Description</Typography>
							<Typography variant='body2'>{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const productSlugs = await dbProducts.getAllProductsSlugs();

	return {
		paths: productSlugs.map(({ slug }) => ({
			params: { slug },
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = '' } = params as { slug: string };
	const product = await dbProducts.getProductBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			product,
		},
		revalidate: 60 * 60 * 24,
	};
};

interface ProductPageProps {
	product: IProduct;
}

export default ProductPage;
