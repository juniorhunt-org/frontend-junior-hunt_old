import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import Button from "./ui/Button";
import { useAuth } from "../hooks/useAuth";
import Field from "./ui/Field";

interface IData {
	username: string;
	password: string;
}

const Login = () => {
	const [data, setData] = useState<IData>({} as IData);
	const { login } = useAuth();

	const loginHandler = () => {
		if (data.username && data.password) {
			login(data.username, data.password);
		} else {
			Alert.alert("Login failed", "All fields are required");
		}
	};

	return (
		<>
			<Field
				onChange={(val) => setData({ ...data, username: val })}
				val={data.username}
				contentType="username"
				placeholder="Enter username"
			/>
			<Field
				onChange={(val) => setData({ ...data, password: val })}
				val={data.password}
				contentType="password"
				isSecure={true}
				placeholder="Enter password"
			/>
			<Button title="Login" onPress={loginHandler} />
		</>
	);
};

export default Login;
