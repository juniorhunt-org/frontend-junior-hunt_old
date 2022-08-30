import React, { useState } from "react";
import { Alert } from "react-native";
import Button from "../ui/Button";
import Field from "../ui/Field";
import Row from "../ui/Row";
import { useAuth } from "../../hooks/useAuth";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";

interface IData {
	first_name: string;
	last_name: string;
	password: string;
	second_password: string;
	username: string;
	email: string;
	phone: string;
	description: string;
	address: string;
}

const School = () => {
	const [data, setData] = useState<IData>({} as IData);
	useAsyncStorage("register_form_school", setData, data);

	const { register: register_school } = useAuth();

	const submitHandler = async () => {
		if (
			data.password &&
			data.second_password &&
			data.first_name &&
			data.last_name
		) {
			register_school(
				data.email,
				data.username,
				data.password,
				data.phone,
				data.first_name,
				data.last_name
			);
		} else {
			Alert.alert("Ошибка регистрации", "Все поля обязательные");
		}

		console.log(data);
	};

	return (
		<>
			<Field
				val={data.username}
				onChange={(value) => setData({ ...data, username: value })}
				placeholder="Введите никнейм"
				contentType="username"
			/>
			<Field
				val={data.phone}
				onChange={(value) => setData({ ...data, phone: value })}
				placeholder="Введите ваш номер телефона"
				contentType="telephoneNumber"
				keyboardType="number-pad"
			/>
			<Field
				val={data.email}
				onChange={(value) => setData({ ...data, email: value })}
				placeholder="Введите email"
				contentType="emailAddress"
				keyboardType="email-address"
			/>
			<Row>
				<Field
					width={49}
					val={data.first_name}
					onChange={(value) => setData({ ...data, first_name: value })}
					placeholder="Введите имя"
				/>
				<Field
					width={49}
					val={data.last_name}
					onChange={(value) => setData({ ...data, last_name: value })}
					placeholder="Введите фамилию"
				/>
			</Row>
			<Row>
				<Field
					width={49}
					val={data.password}
					isSecure={true}
					contentType="password"
					onChange={(value) => setData({ ...data, password: value })}
					placeholder="Введите пароль"
				/>
				<Field
					width={49}
					contentType="password"
					isSecure={true}
					val={data.second_password}
					onChange={(value) => setData({ ...data, second_password: value })}
					placeholder="Потвердите ваш пароль"
				/>
			</Row>
			<Button title="Зарегестрироваться" onPress={submitHandler} />
		</>
	);
};

export default School;