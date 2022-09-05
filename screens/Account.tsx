import React, { FC, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { View } from "react-native";
import Label from "../components/ui/Label";
import Field from "../components/ui/Field";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface IUpdateDate {
	description: string;
	contacts: string;
}

const Account: FC = () => {
	const { logout, user } = useAuth();
	const [data, setData] = useState<IUpdateDate>({} as IUpdateDate);
	const colorscheme = useColorScheme();

	const Wrapper = styled.View`
		margin-top: 15px;
		padding: 10px 10px;
		background-color: ${Colors[colorscheme].background};
		border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		border: 2px solid ${Colors[colorscheme].tint};
	`;

	return (
		<Layout>
			<Wrapper>
				<Label>
					{user.detailInfo.first_name} {user.detailInfo.last_name}
				</Label>
				<Field
					placeholder="Изменить описание"
					keyboardType="default"
					multiline
					contentType="jobTitle"
					onChange={(value) => setData({ ...data, description: value })}
					val={data.description}
				/>
				<Field
					multiline
					placeholder="Изменить контактные данные"
					onChange={(value) => setData({ ...data, contacts: value })}
					val={data.contacts}
				/>
				<Button title="Обновить информацию" onPress={() => {}} />
			</Wrapper>
			<View
				style={{
					height: "50%",
					justifyContent: "flex-end",
				}}
			>
				<Button title="Выйти" onPress={logout} />
			</View>
		</Layout>
	);
};

export default Account;
