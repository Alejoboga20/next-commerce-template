import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const colums: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 100,
	},
	{
		field: 'fullname',
		headerName: 'Full Name',
		width: 300,
	},
	{
		field: 'Paid',
		headerName: 'Pay',
		description: 'Show Payment info',
		width: 200,
		renderCell: (params: any) => {
			return params.row.paid ? (
				<Chip color='success' label='Paid' variant='outlined' />
			) : (
				<Chip color='error' label='No Paid' variant='outlined' />
			);
		},
	},
	{
		field: 'Order',
		headerName: 'See Order',
		description: 'Show Order info',
		width: 200,
		sortable: false,
		renderCell: (params: any) => {
			return (
				<NextLink href={`/orders/${params.row.orderId}`} passHref>
					<Link underline='always'>See Order</Link>
				</NextLink>
			);
		},
	},
];

const rows = [
	{
		id: 1,
		paid: true,
		fullname: 'Alejo Boga',
	},
	{
		id: 2,
		paid: false,
		fullname: 'Dario Alegre',
	},
	{
		id: 3,
		paid: false,
		fullname: 'Fernando Herrera',
	},
	{
		id: 4,
		paid: true,
		fullname: 'Vicky santillan',
	},
];

const HistoryPage: NextPage<HistoryPageProps> = ({ orders }) => {
	const rows = orders.map((order, index) => ({
		id: index + 1,
		paid: order.isPaid,
		fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
		orderId: order._id,
	}));

	return (
		<ShopLayout title='Order History' pageDescription='Timeline History'>
			<Typography variant='h1' component='h1'>
				Order History
			</Typography>

			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 400, width: '100%' }}>
					<DataGrid rows={rows} columns={colums} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: '/auth/login?p=/orders/history',
				permanent: false,
			},
		};
	}

	const id = session.user._id;
	const orders = await dbOrders.getOrdersByUser(id);

	return {
		props: {
			orders,
		},
	};
};

interface HistoryPageProps {
	orders: IOrder[];
}

export default HistoryPage;
