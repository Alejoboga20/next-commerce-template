import { Box } from '@mui/material';
import Head from 'next/head';

export const AuthLayout = ({ title, children }: AuthLayoutProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>

			<main>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					height='calc(100vh - 200px)'
				>
					{children}
				</Box>
			</main>
		</>
	);
};

interface AuthLayoutProps {
	title: string;
	children: JSX.Element | JSX.Element[];
}
