import axios from "axios";

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
	const { auth_token }: ILogin = response.data;
	return auth_token;
};

export const registerBase = async (
	username: string,
	password: string,
	email: string,
	phone: string
) => {
	const { data } = await axios.post("http://213.139.208.189/api/users/", {
		username,
		password,
		email,
		phone,
	});
	return data;
};

export const getUserType = async (token: string) => {
	const response = await axios.get(
		"http://213.139.208.189/api/v1/school_user/",
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);

	if (response.status === 200) {
		return "school_user";
	}
	return "employed_user";
};
