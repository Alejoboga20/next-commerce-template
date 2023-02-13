import Head from 'next/head';
import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';
import { Box, Typography } from '@mui/material';

export const AdminLayout = ({ title, subtitle, icon, children }: AdminLayoutProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='og:subtitle' content={subtitle} />
				<meta name='og:title' content={title} />
			</Head>
			<nav>
				<AdminNavbar />
			</nav>
			<SideMenu />
			<main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}>
				<Box display='flex' flexDirection='column'>
					<Typography variant='h1' component='h1'>
						{icon}
						{title}
					</Typography>
					<Typography variant='h2' sx={{ mb: 1 }}>
						{subtitle}
					</Typography>

					<Box className='fadeIn'>{children}</Box>
				</Box>
			</main>
		</>
	);
};

interface AdminLayoutProps {
	title: string;
	subtitle: string;
	icon?: JSX.Element;
	children?: JSX.Element | JSX.Element[];
}
