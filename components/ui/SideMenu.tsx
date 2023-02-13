import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	EscalatorWarningOutlined,
	FemaleOutlined,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined,
} from '@mui/icons-material';
import { UiContext, AuthContext } from '../../context';
import { DashboardOutlined } from '@mui/icons-material';

export const SideMenu = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');
	const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
	const { user, isLoggedIn, logout } = useContext(AuthContext);

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;

		navigateTo(`/search/${searchTerm}`);
	};

	const navigateTo = (url: string) => {
		router.push(url);
		toggleSideMenu();
	};

	return (
		<Drawer
			open={isMenuOpen}
			onClose={toggleSideMenu}
			anchor='right'
			sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
		>
			<Box sx={{ width: 250, paddingTop: 5 }}>
				<List>
					<ListItem>
						<Input
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
							type='text'
							placeholder='Buscar...'
							autoFocus
							endAdornment={
								<InputAdornment position='end'>
									<IconButton onClick={onSearchTerm}>
										<SearchOutlined />
									</IconButton>
								</InputAdornment>
							}
						/>
					</ListItem>

					{isLoggedIn && (
						<>
							<ListItemButton>
								<ListItemIcon>
									<AccountCircleOutlined />
								</ListItemIcon>
								<ListItemText primary={'Profile'} />
							</ListItemButton>

							<ListItemButton onClick={() => navigateTo('/orders/history')}>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'My Orders'} />
							</ListItemButton>
						</>
					)}

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/men')}
					>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Men'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/women')}
					>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Women'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/kid')}
					>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText primary={'Kid'} />
					</ListItemButton>

					{isLoggedIn ? (
						<ListItemButton onClick={logout}>
							<ListItemIcon>
								<LoginOutlined />
							</ListItemIcon>
							<ListItemText primary={'Exit'} />
						</ListItemButton>
					) : (
						<ListItemButton onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
							<ListItemIcon>
								<VpnKeyOutlined />
							</ListItemIcon>
							<ListItemText primary={'SignIn'} />
						</ListItemButton>
					)}

					{user?.role === 'admin' && (
						<>
							<Divider />
							<ListSubheader>Admin Panel</ListSubheader>

							<ListItemButton onClick={() => navigateTo('/admin/')}>
								<ListItemIcon>
									<DashboardOutlined />
								</ListItemIcon>
								<ListItemText primary={'Dashboard'} />
							</ListItemButton>
							<ListItemButton>
								<ListItemIcon>
									<CategoryOutlined />
								</ListItemIcon>
								<ListItemText primary={'Products'} />
							</ListItemButton>
							<ListItemButton>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Orders'} />
							</ListItemButton>

							<ListItemButton onClick={() => navigateTo('/admin/users')}>
								<ListItemIcon>
									<AdminPanelSettings />
								</ListItemIcon>
								<ListItemText primary={'Users'} />
							</ListItemButton>
						</>
					)}
				</List>
			</Box>
		</Drawer>
	);
};
