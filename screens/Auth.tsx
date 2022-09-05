import React, { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FadeInView } from "../components/FadeInView";
import Layout from "../components/layout/Layout";
import Loader from "../components/Loader";
import Login from "../components/Login";
import Register from "../components/Register/Register";
import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import useColorScheme from "../hooks/useColorScheme";
import { RootStackScreenProps } from "../types";

const Auth: FC<RootStackScreenProps<"Auth">> = ({ navigation }) => {
	const { isLoading } = useAuth();
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const colorscheme = useColorScheme();

	const SmallTitle = styled.Text`
		font-size: 14px;
		margin-top: 10px;
		margin-right: 20px;
		color: ${Colors[colorscheme].text};
		text-align: right;
	`;

	return (
		<FadeInView>
			<Layout>
				{isLoading ? (
					<Loader />
				) : (
					<>
						{isLogin ? <Login /> : <Register />}
						<TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
							<SmallTitle>
								{isLogin ? "Зарегистрироваться" : "Войти"}
							</SmallTitle>
						</TouchableOpacity>
					</>
				)}
			</Layout>
		</FadeInView>
	);
};

export default Auth;
