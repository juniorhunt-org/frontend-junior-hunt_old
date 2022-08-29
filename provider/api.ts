import axios from "axios";
import { Alert } from "react-native";
import { ProfileUser } from "../types";

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
	console.log(response.status);
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

export const registerProfile = async (data: ProfileUser, token: string) => {
	try {
		const response = await axios.post(
			"http://213.139.208.189/api/v1/profile_user/",
			data,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			}
		);
		console.log(response.data, "response register profile");
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const detailInfo = async (token: string): Promise<ProfileUser> => {
	const { data } = await axios.get(
		"http://213.139.208.189/api/v1/profile_user/",
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
	return data[0];
};
