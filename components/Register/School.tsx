import React, { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { Picker } from "@react-native-community/picker";
import Button from "../ui/Button";
import Field from "../ui/Field";
import Row from "../ui/Row";
import PhoneNumberField from "../ui/PhoneNumberField";
import { useAuth } from "../../hooks/useAuth";

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

	const { register_school } = useAuth();

	const submitHandler = () => {
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
			Alert.alert("Register error", "Все поля обязательные");
		}

		console.log(data);
	};

	return (
		<>
			<Field
				val={data.username}
				onChange={(value) => setData({ ...data, username: value })}
				placeholder="Username"
				contentType="username"
			/>
			<PhoneNumberField
				onChange={(value) => setData({ ...data, phone: value })}
			/>
			<Field
				val={data.email}
				onChange={(value) => setData({ ...data, email: value })}
				placeholder="Email"
				contentType="emailAddress"
				keyboardType="email-address"
			/>
			<Row>
				<Field
					width={49}
					val={data.first_name}
					onChange={(value) => setData({ ...data, first_name: value })}
					placeholder="First Name"
				/>
				<Field
					width={49}
					val={data.last_name}
					onChange={(value) => setData({ ...data, last_name: value })}
					placeholder="Last Name"
				/>
			</Row>
			<Row>
				<Field
					width={49}
					val={data.password}
					isSecure={true}
					contentType="password"
					onChange={(value) => setData({ ...data, password: value })}
					placeholder="Password"
				/>
				<Field
					width={49}
					contentType="password"
					isSecure={true}
					val={data.second_password}
					onChange={(value) => setData({ ...data, second_password: value })}
					placeholder="Second Password"
				/>
			</Row>
			<Button title="Register" onPress={submitHandler} />
		</>
	);
};

export default School;
