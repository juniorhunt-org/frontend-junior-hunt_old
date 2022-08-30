import React, { FC } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { View } from "react-native";

const Account: FC = () => {
	const { logout } = useAuth();

	return (
		<Layout>
			<View
				style={{
					height: "95%",
					justifyContent: "flex-end",
				}}
			>
				<Button title="Выйти" onPress={logout} />
			</View>
		</Layout>
	);
};

export default Account;
