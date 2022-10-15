import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes';
import { CartProvider, UiProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (...args: [key: string]) => fetch(...args).then((res) => res.json()),
			}}
		>
			<CartProvider>
				<UiProvider>
					<ThemeProvider theme={lightTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UiProvider>
			</CartProvider>
		</SWRConfig>
	);
}

export default MyApp;
