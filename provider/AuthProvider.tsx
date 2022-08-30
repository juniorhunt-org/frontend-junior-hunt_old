import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, FC, ReactNode, useState } from "react";
import { Alert } from "react-native";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { IAd, User } from "../types";
import {
	detailInfo,
	getAdds,
	login,
	registerBase,
	registerProfile,
} from "./api";

interface IContext {
	isLoading: boolean;
	user: User;
	login: (username: string, password: string) => void;
	register: (
		email: string,
		username: string,
		password: string,
		phone: string,
		first_name: string,
		last_name: string,
		company_name?: string
	) => void;
	logout: () => void;
	fetchAds: () => Promise<IAd[]>;
}

interface IProvider {
	children: ReactNode;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<IProvider> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<User>({} as User);
	useAsyncStorage("user", setUser, user);

	const loginHandler = async (username: string, password: string) => {
		setIsLoading(true);
		try {
			const token = await login(username, password);
			const detail = await detailInfo(token);
			setUser({ ...user, token: token, detailInfo: detail });
			AsyncStorage.removeItem("login_form");
		} catch (error: any) {
			const errorData = error.response.data;
			Object.keys(errorData).forEach((key: any) => {
				let fieldsKey = key;
				switch (key) {
					case "non_field_errors":
						fieldsKey = "";
					case "username":
						fieldsKey = "Никнейм: ";
					case "password":
						fieldsKey = "Пароль: ";
				}
				Alert.alert("Ошибка регистрации", fieldsKey + errorData[key][0]);
			});
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
		last_name: string,
		company_name?: string
	) => {
		setIsLoading(true);
		try {
			const base_user = await registerBase(username, password, email, phone);
			const token = await login(username, password);
			if (company_name === undefined)
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
			else
				await registerProfile(
					{
						first_name,
						last_name,
						address: null,
						avatar: null,
						company_name: company_name,
						contacts: null,
						description: "-",
						gender: 0,
						is_company: true,
						second_name: null,
						user_id: base_user.id,
					},
					token
				);
			const detail = await detailInfo(token);
			setUser({ ...user, token: token, detailInfo: detail });
			AsyncStorage.removeItem("register_form_school");
			AsyncStorage.removeItem("company_registration_form");
			AsyncStorage.removeItem("is_company_form");
		} catch (error: any) {
			const errorData = error.response.data;
			Object.keys(errorData).forEach((key: any) => {
				let fieldsKey = key;
				switch (key) {
					case "phone":
						fieldsKey = "Номер телефона: ";
						break;
					case "email":
						fieldsKey = "Email: ";
						break;
					case "username":
						fieldsKey = "Никнейм: ";
					case "password":
						fieldsKey = "Пароль: ";
				}
				Alert.alert("Ошибка регистрации", fieldsKey + errorData[key][0]);
			});
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => setUser({} as User);

	const fetchAds = async () => {
		setIsLoading(true);
		const ads = await getAdds(user.token);
		setIsLoading(false);
		return ads;
	};

	const value = {
		isLoading,
		user,
		logout,
		login: loginHandler,
		register: registerHandler,
		fetchAds,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
