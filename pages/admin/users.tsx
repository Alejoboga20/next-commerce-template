import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Grid, Select, MenuItem } from '@mui/material';
import { PeopleOutline } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';

interface UsersResponse {
	users: IUser[];
}

const UsersPage = () => {
	const { data, error } = useSWR<UsersResponse>('/api/admin/users');
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		if (data) {
			setUsers(data.users);
		}
	}, [data]);

	if (!data && !error) return <div>Loading...</div>;

	const onRoleUpdated = async (userId: string, newRole: string) => {
		const prevUsers = users.map((user) => ({ ...user })) as IUser[];
		const updatedUsers = users.map((user) => ({
			...user,
			role: userId === user._id ? newRole : user.role,
		})) as IUser[];

		try {
			await tesloApi.put('/admin/users', { userId, role: newRole });
			setUsers(updatedUsers);
		} catch (error) {
			setUsers(prevUsers);
			console.log({ error });
		}
	};

	const columns: GridColDef[] = [
		{ field: 'email', headerName: 'Email', width: 250 },
		{ field: 'name', headerName: 'Name', width: 300 },
		{
			field: 'role',
			headerName: 'Role',
			width: 300,
			renderCell: ({ row }) => {
				console.log({ row });
				return (
					<Select
						value={row.role}
						label='Role'
						sx={{ width: '300px' }}
						onChange={({ target }) => onRoleUpdated(row.id, target.value)}
					>
						<MenuItem value='admin'>Admin</MenuItem>
						<MenuItem value='client'>Client</MenuItem>
						<MenuItem value='super-user'>Super-User</MenuItem>
						<MenuItem value='SEO'>SEO</MenuItem>
					</Select>
				);
			},
		},
	];

	const rows = users.map((user) => ({
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	}));

	return (
		<AdminLayout title='Users' subtitle='Users Dashboard' icon={<PeopleOutline />}>
			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 400, width: '100%' }}>
					<DataGrid rows={rows!} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default UsersPage;
