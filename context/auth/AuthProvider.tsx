import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useReducer } from 'react';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

	const loginUser = async (email: string, password: string): Promise<boolean> => {
		try {
			const { data } = await tesloApi.post('/user/login', { email, password });
			const { token, user } = data;
			Cookies.set('token', token);

			dispatch({ type: '[Auth] - Login', payload: user });
			return true;
		} catch (error) {
			return false;
		}
	};

	const registerUser = async (
		email: string,
		password: string,
		name: string
	): Promise<{ hasError: boolean; message?: string }> => {
		try {
			const { data } = await tesloApi.post('/user/register', { email, password, name });
			const { token, user } = data;
			Cookies.set('token', token);

			dispatch({ type: '[Auth] - Login', payload: user });
			return {
				hasError: false,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					hasError: true,
					message: error.response?.data.message,
				};
			}

			return {
				hasError: true,
				message: 'Unable to create this user',
			};
		}
	};

	const checkToken = async () => {
		try {
			const { data } = await tesloApi.get('/user/validate-token');
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
		} catch (error) {
			Cookies.remove('token');
		}
	};

	useEffect(() => {
		checkToken();
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, loginUser, registerUser }}>
			{children}
		</AuthContext.Provider>
	);
};

interface AuthProviderProps {
	children: JSX.Element | JSX.Element[];
}
