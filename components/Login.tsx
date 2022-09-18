import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import Button from "./ui/Button";
import { useAuth } from "../hooks/useAuth";
import Field from "./ui/Field";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import PasswordField from "./ui/PasswordField";
import { FadeInView } from "./FadeInView";

interface IData {
	username: string;
	password: string;
}

const Login = () => {
	const [data, setData] = useState<IData>({} as IData);
	const { login } = useAuth();
	useAsyncStorage("login_form", setData, data);

	const loginHandler = () => {
		if (data.username && data.password) {
			login(data.username, data.password);
		} else {
			Alert.alert("Ошибка входа", "Все поля обязательные");
		}
	};

	return (
		<FadeInView>
			<Field
				onChange={(val) => setData({ ...data, username: val })}
				val={data.username}
				contentType="username"
				placeholder="Введите никнейм"
			/>
			<PasswordField
				val={data.password}
				width={100}
				onChange={(value) => setData({ ...data, password: value })}
				placeholder="Введите пароль"
			/>
			<Button title="Войти" onPress={loginHandler} />
		</FadeInView>
	);
};

export default Login;
