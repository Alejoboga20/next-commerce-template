import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const EmptyCartPage = () => {
	return (
		<ShopLayout title='Empty Short Cart' pageDescription='No Articles'>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 200px)'
				sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
			>
				<RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
				<Box display='flex' flexDirection='column' alignItems='center'>
					<Typography>Shopping Cart Empty</Typography>
					<NextLink href='/' passHref>
						<Link>
							<Typography variant='h4'>Go Back</Typography>
						</Link>
					</NextLink>
				</Box>
			</Box>
		</ShopLayout>
	);
};

export default EmptyCartPage;
