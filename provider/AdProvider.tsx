import { createContext, FC, ReactNode, useState } from "react";
import { Alert } from "react-native";
import { ValueMap } from "react-native-simple-time-picker";
import { ApiErrorAlert } from "../decorators";
import { useAuth } from "../hooks/useAuth";
import { ICreateAd } from "../screens/AddFormAd";
import { IAd, Schedule } from "../types";
import {
	createAd,
	createScheduleTime,
	deleteReplyAd,
	getReplyAds,
	getSchedule,
	requestAd,
} from "./api";

interface IContext {
	ad: IAd;
	setAd: (ad: IAd) => void;
	requestAd: () => void;
	getReplyAds: () => Promise<IAd[]>;
	createAd: (ad: ICreateAd) => Promise<IAd>;
	deleteReplyAd: (ad_id: number) => void;
	createSchedule: (
		ad: IAd,
		start: ValueMap,
		stop: ValueMap,
		week_day: number
	) => void;
	getSchedule: (ad: IAd) => Promise<Schedule>;
}

export const AdContext = createContext<IContext>({} as IContext);

interface IProvider {
	children: ReactNode;
}

export const AdProvider: FC<IProvider> = ({ children }) => {
	const [ad, setAd] = useState<IAd>({} as IAd);
	const { user, setIsLoading } = useAuth();

	const requestAdHandler = async () => {
		setIsLoading(true);
		await requestAd(user.token, ad);
		setIsLoading(false);
	};

	const deleteReplyAdHandler = async (ad_id: number) => {
		setIsLoading(true);
		await deleteReplyAd(user.token, ad_id);
		setIsLoading(false);
	};

	const getReplyAdsHandler = async () => {
		const value = await getReplyAds(user.token);
		return value;
	};

	const createAdHandler = async (ad: ICreateAd) => {
		setIsLoading(true);
		const target = async () => {
			const value = await createAd(
				user.token,
				ad,
				user.detailInfo.id ? user.detailInfo.id : 1
			);
			return value;
		};
		const value: Promise<IAd> = ApiErrorAlert(target);
		setIsLoading(false);
		return value;
	};

	const createScheduleHandler = async (
		ad: IAd,
		start: ValueMap,
		stop: ValueMap,
		week_day: number
	) => {
		setIsLoading(true);
		const target = async () => {
			await createScheduleTime(user.token, start, stop, week_day, ad.id);
		};
		await ApiErrorAlert(target);
		setIsLoading(false);
	};

	const getScheduleHandler = async (ad: IAd) => {
		setIsLoading(true);
		const target = async () => {
			const data = await getSchedule(user.token, ad.id);
			return data[0];
		};
		const value: Schedule = await ApiErrorAlert(target);
		setIsLoading(false);
		return value;
	};

	const value = {
		ad,
		setAd,
		getReplyAds: getReplyAdsHandler,
		requestAd: requestAdHandler,
		createAd: createAdHandler,
		deleteReplyAd: deleteReplyAdHandler,
		createSchedule: createScheduleHandler,
		getSchedule: getScheduleHandler,
	};

	return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};
