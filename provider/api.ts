import axios from "axios";
import { ValueMap } from "react-native-simple-time-picker";
import { IUpdateData } from "../screens/Account";
import { ICreateAd } from "../screens/AddFormAd";
import { CreateUserProfile, IAd, ProfileUser, Schedule } from "../types";

interface ILogin {
	auth_token: string;
}

export const login = async (username: string, password: string) => {
	const response = await axios.post(
		"http://213.139.208.189/api/auth/token/login",
		{
			username,
			password,
		}
	);
	console.log(response);
	const { auth_token }: ILogin = response.data;
	return auth_token;
};

export const registerBase = async (
	username: string,
	password: string,
	email: string,
	phone: string
) => {
	let data = {
		username: username,
		password: password,
		email: email,
		phone: phone,
	};
	const response = await axios.post(
		"http://213.139.208.189/api/auth/users/",
		data
	);
	return response.data;
};

export const registerProfile = async (
	data: CreateUserProfile,
	token: string
) => {
	const response = await axios.post(
		"http://213.139.208.189/api/v1/profile_user/",
		data,
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
	return response.data;
};

export const detailInfo = async (token: string): Promise<ProfileUser> => {
	const { data } = await axios.get(
		"http://213.139.208.189/api/v1/profile_user/?me=1",
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
	return data[0];
};

export const getAdds = async (token: string): Promise<IAd[]> => {
	const { data } = await axios.get("http://213.139.208.189/api/ads/ad/", {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
	return data;
};

export const requestAd = async (token: string, ad: IAd) => {
	const response = await axios.post(
		`http://213.139.208.189/api/ads/add_user/`,
		{ ad_id: ad.id },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
};

export const deleteReplyAd = async (token: string, ad_id: number) => {
	const response = await axios.delete(
		`http://213.139.208.189/api/ads/add_user/?ad_id=${ad_id}`,
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
};

export const getReplyAds = async (token: string): Promise<IAd[]> => {
	const { data } = await axios.get(
		"http://213.139.208.189/api/ads/reply_ads/",
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
	return data;
};

export const createAd = async (
	token: string,
	ad: ICreateAd,
	user_id: number
): Promise<IAd> => {
	const { data } = await axios.post(
		"http://213.139.208.189/api/ads/ad/",
		{ ...ad, category: 1, owner: user_id },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
	return data;
};

export const createScheduleTime = async (
	token: string,
	start: ValueMap,
	stop: ValueMap,
	week_day: number,
	ad: number
) => {
	const data = {
		start: `${start.hours}:${start.minutes}:00`,
		stop: `${stop.hours}:${stop.minutes}:00`,
		week_day,
		ad,
	};
	await axios.post("http://213.139.208.189/api/ads/schedule/", data, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
};

export const getSchedule = async (
	token: string,
	ad: number
): Promise<Schedule[]> => {
	const { data } = await axios.get(
		`http://213.139.208.189/api/ads/schedule/?ad=${ad}`,
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
	return data;
};

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getUserInfo = async (user_id: number) => {
	const { data } = await axios.get(
		`http://213.139.208.189/api/v1/profile_user/${user_id}/`
	);
	return data;
};

export const getMyAds = async (token: string, ownerId: number) => {
	const { data } = await axios.get(
		`http://213.139.208.189/api/ads/ad/?owner=${ownerId}`,
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
	return data;
};

export const deleteAd = async (token: string, ad_id: number) => {
	const response = await axios.delete(
		`http://213.139.208.189/api/ads/ad/${ad_id}/`,
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
};

export const updateProfileData = async (
	token: string,
	data: IUpdateData,
	user_id: number
) => {
	await axios.patch(
		`http://213.139.208.189/api/v1/profile_user/${user_id}/`,
		data,
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
};
