import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	Modal: undefined;
	Auth: undefined;
	addForm: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
	Home: undefined;
	Search: undefined;
	Account: undefined;
	Login: undefined;
	Modal: undefined;
};

export type AuthTabParamList = {
	Auth: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;

export interface ProfileUser {
	id: number;
	first_name: string;
	last_name: string;
	second_name: string | null;
	address: string | null;
	gender: number;
	avatar: string | null;
	is_company: boolean;
	company_name: string | null;
	contacts: string | null;
	user_id: number;
	description: string;
}

export interface CreateUserProfile {
	first_name: string;
	last_name: string;
	second_name: string | null;
	address: string | null;
	gender: number;
	avatar: string | null;
	is_company: boolean;
	company_name: string | null;
	contacts: string | null;
	user_id: number;
	description: string;
}

export interface User {
	token: string;
	detailInfo: ProfileUser;
}

export interface IAd {
	id: number;
	title: string;
	description: string;
	owner: number;
	payment: number;
	limit: number;
	category: number;
	address: string;
	users: number[];
}

export interface Schedule {
	id: number;
	start: string;
	stop: string;
	week_day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	ad: number;
}

export const NumberToWeekDay = {
	0: "понедельник",
	1: "вторник",
	2: "среду",
	3: "четверг",
	4: "пятницу",
	5: "субботу",
	6: "воскресенье",
};
