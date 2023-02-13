import useSWR from 'swr';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminLayout } from '../../../components/layouts';
import { IOrder } from '../../../interfaces/order';
import { IUser } from '../../../interfaces';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'Order ID', width: 250 },
	{ field: 'email', headerName: 'Email', width: 250 },
	{ field: 'name', headerName: 'Name', width: 250 },
	{ field: 'total', headerName: 'Total', width: 250 },
	{
		field: 'isPaid',
		headerName: 'Paid',
		renderCell: ({ row }) =>
			row.isPaid ? (
				<Chip variant='outlined' label='paid' color='success' />
			) : (
				<Chip variant='outlined' label='pending' color='error' />
			),
	},
	{
		field: 'check',
		headerName: 'See Order',
		renderCell: ({ row }) => (
			<a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
				See Order
			</a>
		),
	},
	{ field: 'createdAt', headerName: 'Created At', width: 250 },
];

const OrdersPage = () => {
	const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

	if (!data && !error) return <div>Loading...</div>;

	const rows = data?.map((order) => ({
		id: order._id,
		email: (order.user as IUser).email,
		name: (order.user as IUser).name,
		total: order.total,
		isPaid: order.isPaid,
		createdAt: order.createdAt,
	}));

	return (
		<AdminLayout
			title='Orders'
			subtitle='Orders Maintainance'
			icon={<ConfirmationNumberOutlined />}
		>
			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 400, width: '100%' }}>
					<DataGrid rows={rows || []} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default OrdersPage;
