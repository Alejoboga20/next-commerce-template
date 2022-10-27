import { createContext } from 'react';
import { IUser } from '../../interfaces';

export interface AuthContextProps {
	isLoggedIn: boolean;
	user?: IUser;
	loginUser: (email: string, password: string) => Promise<boolean>;
	registerUser: (
		email: string,
		password: string,
		name: string
	) => Promise<{ hasError: boolean; message?: string }>;
	logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
