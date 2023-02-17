import useSWR from 'swr';
import { AddOutlined, ConfirmationNumberOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminLayout } from '../../../components/layouts';
import { IProduct } from '../../../interfaces';
import NextLink from 'next/link';

const columns: GridColDef[] = [
	{
		field: 'img',
		headerName: 'Picture',
		renderCell: ({ row }) => (
			<a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
				<CardMedia component='img' src={row.img} />
			</a>
		),
	},
	{
		field: 'title',
		headerName: 'Title',
		width: 250,
		renderCell: ({ row }) => (
			<NextLink href={`/admin/products/${row.slug}`} passHref>
				<Link underline='always'>{row.title}</Link>
			</NextLink>
		),
	},
	{ field: 'gender', headerName: 'Gender' },
	{ field: 'type', headerName: 'Type' },
	{ field: 'inStock', headerName: 'Stock' },
	{ field: 'price', headerName: 'Price' },
	{ field: 'sizes', headerName: 'Sizes', width: 250 },
];

const ProductsPage = () => {
	const { data, error } = useSWR<IProduct[]>('/api/admin/products');

	console.log({ data });

	if (!data && !error) return <div>Loading...</div>;

	const rows = data?.map((product) => ({
		id: product._id,
		img: product.images[0],
		title: product.title,
		gender: product.gender,
		type: product.type,
		inStock: product.inStock,
		price: product.price,
		sizes: product.sizes.join(', '),
		slug: product.slug,
	}));

	return (
		<AdminLayout
			title='Products'
			subtitle='Products Maintainance'
			icon={<ConfirmationNumberOutlined />}
		>
			<Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
				<Button startIcon={<AddOutlined />} color='secondary' href='/admin/products/new'>
					Create Product
				</Button>
			</Box>
			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 400, width: '100%' }}>
					<DataGrid rows={rows || []} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default ProductsPage;
