import React, { createContext, FC, ReactNode, useState } from "react";
import { Alert } from "react-native";
import { User } from "../types";
import { login } from "./api";

interface IContext {
	isLoading: boolean;
	user: User;
	login: (username: string, password: string) => void;
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
			setUser({ ...user, token: token });
		} catch (err: any) {
			Alert.alert("error login", err);
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		isLoading,
		user,
		login: loginHandler,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
