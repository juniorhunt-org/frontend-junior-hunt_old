import { TouchableHighlight } from "react-native";
import React, { FC } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const Account: FC = () => {
	const { logout } = useAuth();
	const colorscheme = useColorScheme();

	const Text = styled.Text`
		color: ${Colors[colorscheme].text};
		padding: 20px;
		border: 1px solid ${Colors[colorscheme].tint};
		border-radius: 10px;
	`;

	return (
		<Layout>
			<TouchableHighlight onPress={logout}>
				<Text>Log out</Text>
			</TouchableHighlight>
		</Layout>
	);
};

export default Account;
