import { View, Text } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";
import Field from "./Field";

interface IData {
	username: string;
	password: string;
}

const Login = () => {
	const [data, setData] = useState<IData>({} as IData);
	const { login } = useAuth();
	return (
		<>
			<Field
				onChange={(val) => setData({ ...data, username: val })}
				val={data.username}
				placeholder="Enter username"
			/>
			<Field
				onChange={(val) => setData({ ...data, password: val })}
				val={data.password}
				isSecure={true}
				placeholder="Enter password"
			/>
			<Button
				title="Login"
				onPress={() => login(data.username, data.password)}
			/>
		</>
	);
};

export default Login;
