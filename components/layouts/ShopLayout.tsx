import Head from 'next/head';
import { Navbar } from '../ui';

export const ShopLayout = ({ title, pageDescription, imageFullUrl, children }: ShopLayoutProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>

				<meta name='description' content={pageDescription} />
				<meta name='og:title' content={title} />
				<meta name='og:description' content={pageDescription} />

				{imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
			</Head>

			<Navbar />

			{/* Sidebar */}

			<main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0 30px' }}>{children}</main>

			<footer>{/* Footer */}</footer>
		</>
	);
};

interface ShopLayoutProps {
	title: string;
	pageDescription: string;
	imageFullUrl?: string;
	children: JSX.Element | JSX.Element[];
}
