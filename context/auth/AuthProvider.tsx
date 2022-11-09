import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
	const { data, status } = useSession();
	const router = useRouter();
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

	const logout = () => {
		Cookies.remove('cart');
		Cookies.remove('firstName');
		Cookies.remove('lastName');
		Cookies.remove('address');
		Cookies.remove('address2');
		Cookies.remove('zip');
		Cookies.remove('city');
		Cookies.remove('country');
		Cookies.remove('phone');

		signOut();
	};

	const checkToken = async () => {
		if (!Cookies.get('token')) return;

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
		if (status === 'authenticated') {
			dispatch({ type: '[Auth] - Login', payload: data.user as IUser });
		}
	}, [status, data]);

	return (
		<AuthContext.Provider value={{ ...state, loginUser, registerUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

interface AuthProviderProps {
	children: JSX.Element | JSX.Element[];
}
