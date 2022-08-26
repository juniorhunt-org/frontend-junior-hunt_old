import React, { createContext, FC, ReactNode, useState } from "react";
import { Alert } from "react-native";
import { User } from "../types";
import { login, getUserType } from "./api";

interface IContext {
	isLoading: boolean;
	user: User;
	login: (username: string, password: string) => void;
	logout: () => void;
}

interface IProvider {
	children: ReactNode;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<IProvider> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<User>({} as User);

	const loginHandler = async (username: string, password: string) => {
		setIsLoading(true);
		try {
			const token = await login(username, password);
			const type = await getUserType(token);
			setUser({ ...user, token: token, type: type });
		} catch (err: any) {
			console.log(err);
			Alert.alert("error login");
		} finally {
			console.log(user);
			setIsLoading(false);
		}
	};

	const logout = () => setUser({} as User);

	const value = {
		isLoading,
		user,
		logout,
		login: loginHandler,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
