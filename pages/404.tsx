import { Box, Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../components/layouts/ShopLayout';

const NotFoundPage = () => {
	return (
		<ShopLayout title='Not Found - Shop' pageDescription='Page Not Found'>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 200px)'
				sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
			>
				<Typography variant='h1' component='h1' fontSize={75} fontWeight={150}>
					404 |
				</Typography>
				<Typography marginLeft={2}>Page Not Found</Typography>
			</Box>
		</ShopLayout>
	);
};

export default NotFoundPage;
