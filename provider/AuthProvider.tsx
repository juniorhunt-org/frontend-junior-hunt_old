import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
	createContext,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import { Alert } from "react-native";
import { ApiErrorAlert } from "../decorators";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { IUpdateData } from "../screens/Account";
import { IAd, ProfileUser, User } from "../types";
import {
	detailInfo,
	getAdds,
	getUserInfo,
	login,
	registerBase,
	registerProfile,
	updateProfileData,
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
	setIsLoading: (val: SetStateAction<boolean>) => void;
	getUserInfo: (user_id: number) => Promise<ProfileUser>;
	updateUserProfile: (data: IUpdateData) => Promise<void>;
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
		const targer = async () => {
			console.log("login");
			const token = await login(username, password);
			console.log("token", token);
			const detail = await detailInfo(token);
			console.log("token", detail);
			setUser({ ...user, token: token, detailInfo: detail });
		};
		await ApiErrorAlert(targer);
		AsyncStorage.removeItem("login_form");
		setIsLoading(false);
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
		const targer = async () => {
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
		};
		await ApiErrorAlert(targer);
		setIsLoading(false);
	};

	const logout = () => {
		setUser({} as User);
		AsyncStorage.clear();
	};

	const fetchAds = async () => {
		setIsLoading(true);
		const ads = await getAdds(user.token);
		setIsLoading(false);
		return ads;
	};

	const updateUserProfileHandler = async (data: IUpdateData) => {
		setIsLoading(true);
		const target = async () => {
			await updateProfileData(user.token, data, user.detailInfo.id);
			Alert.alert("Ваша информация обновлена");
		};
		await ApiErrorAlert(target);
		setIsLoading(false);
	};

	const value = {
		isLoading,
		user,
		logout,
		login: loginHandler,
		register: registerHandler,
		fetchAds,
		setIsLoading,
		getUserInfo,
		updateUserProfile: updateUserProfileHandler,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
