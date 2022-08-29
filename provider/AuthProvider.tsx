import React, { createContext, FC, ReactNode, useState } from "react";
import { Alert } from "react-native";
import { User } from "../types";
import { detailInfo, login, registerBase, registerProfile } from "./api";

interface IContext {
	isLoading: boolean;
	user: User;
	login: (username: string, password: string) => void;
	register_school: (
		email: string,
		username: string,
		password: string,
		phone: string,
		first_name: string,
		last_name: string
	) => void;
	logout: () => void;
}

interface IProvider {
	children: ReactNode;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<IProvider> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<User>({} as User);

	// TODO: add asyncstorage support

	const loginHandler = async (username: string, password: string) => {
		setIsLoading(true);
		try {
			const token = await login(username, password);
			const detail = await detailInfo(token);
			setUser({ ...user, token: token, detailInfo: detail });
		} catch (err: any) {
			const errorData = err.response.data;
			Alert.alert("Error login", errorData[Object.keys(errorData)[0]][0]);
		} finally {
			setIsLoading(false);
		}
	};

	const registerHandler = async (
		email: string,
		username: string,
		password: string,
		phone: string,
		first_name: string,
		last_name: string
	) => {
		setIsLoading(true);
		try {
			const base_user = await registerBase(username, password, email, phone);
			const token = await login(username, password);
			await registerProfile(
				{
					first_name,
					last_name,
					address: null,
					avatar: null,
					company_name: null,
					contacts: null,
					description: "-",
					gender: 0,
					is_company: false,
					second_name: null,
					user_id: base_user.id,
				},
				token
			);
			const detail = await detailInfo(token);
			setUser({ ...user, token: token, detailInfo: detail });
		} catch (error: any) {
			const errorData = error.response.data;
			Alert.alert(
				"Error registration",
				errorData[Object.keys(errorData)[0]][0]
			);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => setUser({} as User);

	const value = {
		isLoading,
		user,
		logout,
		login: loginHandler,
		register_school: registerHandler,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
