import { createContext } from 'react';

export interface UiContextProps {
	isMenuOpen: boolean;
	toggleSideMenu: () => void;
}

export const UiContext = createContext({} as UiContextProps);
