import React, { useState } from "react";
import styled from "styled-components/native";
import Layout from "../components/layout/Layout";
import Loader from "../components/Loader";
import Login from "../components/ui/Login";
import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import useColorScheme from "../hooks/useColorScheme";

const Auth = () => {
	const { isLoading } = useAuth();
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const colorscheme = useColorScheme();

	const SmallTitle = styled.Text`
		font-size: 14px;
		width: 100%;
		margin-top: 10px;
		margin-right: 20px;
		color: ${Colors[colorscheme].text};
		text-align: right;
	`;

	return (
		<Layout>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{isLogin ? <Login /> : <SmallTitle>Register</SmallTitle>}
					<>
						<SmallTitle>{isLogin ? "Register" : "Login"}</SmallTitle>
					</>
				</>
			)}
		</Layout>
	);
};

export default Auth;
