import { Grid } from '@mui/material';
import { PeopleOutline } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminLayout } from '../../components/layouts';
import useSWR from 'swr';
import { IUser } from '../../interfaces';

const UsersPage = () => {
	const { data, error } = useSWR<IUser>('/api/admin/users');

	if (!data && !error) return <div>Loading...</div>;

	const columns: GridColDef[] = [
		{ field: 'email', headerName: 'Email', width: 250 },
		{ field: 'name', headerName: 'Name', width: 300 },
		{ field: 'role', headerName: 'Role', width: 300 },
	];

	const rows = data?.users.map((user) => ({
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	}));

	return (
		<AdminLayout title='Users' subtitle='Users Dashboard' icon={<PeopleOutline />}>
			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 400, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default UsersPage;
