import { useReducer } from 'react';
import { UiContext } from './UiContext';
import { uiReducer } from './uiReducer';

export interface UiState {
	isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
	isMenuOpen: false,
};
export const UiProvider = ({ children }: UiProviderProps) => {
	const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

	const toggleSideMenu = () => dispatch({ type: '[Ui] - ToggleMenu' });

	return <UiContext.Provider value={{ ...state, toggleSideMenu }}>{children}</UiContext.Provider>;
};
interface UiProviderProps {
	children: JSX.Element | JSX.Element[];
}
