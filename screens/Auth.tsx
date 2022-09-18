import React, { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { FadeInView } from "../components/FadeInView";
import Layout from "../components/layout/Layout";
import Login from "../components/Login";
import Register from "../components/Register/Register";
import Button from "../components/ui/Button";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootStackScreenProps } from "../types";

const Auth: FC<RootStackScreenProps<"Auth">> = ({ navigation }) => {
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
				<>
					{isLogin ? <Login /> : <Register />}
					<SafeAreaView>
						<Button
							title={isLogin ? "зарегестироваться" : "войти"}
							onPress={() => setIsLogin(!isLogin)}
						/>
					</SafeAreaView>
				</>
			</Layout>
		</FadeInView>
	);
};

export default Auth;
