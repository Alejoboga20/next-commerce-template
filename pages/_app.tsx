import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes';
import { AuthProvider, CartProvider, UiProvider } from '../context';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<PayPalScriptProvider
				options={{
					'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
				}}
			>
				<SWRConfig
					value={{
						fetcher: (...args: [key: string]) => fetch(...args).then((res) => res.json()),
					}}
				>
					<AuthProvider>
						<CartProvider>
							<UiProvider>
								<ThemeProvider theme={lightTheme}>
									<CssBaseline />
									<Component {...pageProps} />
								</ThemeProvider>
							</UiProvider>
						</CartProvider>
					</AuthProvider>
				</SWRConfig>
			</PayPalScriptProvider>
		</SessionProvider>
	);
}

export default MyApp;
