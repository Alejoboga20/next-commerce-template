import { createContext } from 'react';
import { IUser } from '../../interfaces';

export interface AuthContextProps {
	isLoggedIn: boolean;
	user?: IUser;
}

export const AuthContext = createContext({} as AuthContextProps);
