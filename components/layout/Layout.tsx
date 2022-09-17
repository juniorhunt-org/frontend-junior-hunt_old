import { View } from "react-native";
import React, { FC, useEffect } from "react";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

interface ILayout {
	children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
	const colorscheme = useColorScheme();

	const { user } = useAuth();
	const { createNotificationTokenOrUpdateInDb } = useNotification();

	useEffect(() => {
		console.log(user);
		if (user && user.detailInfo) {
			createNotificationTokenOrUpdateInDb(user.detailInfo.id, user.token);
		}
	}, [user]);

	return (
		<View
			style={{
				paddingHorizontal: 16,
				height: "100%",
				backgroundColor: Colors[colorscheme].background,
			}}
		>
			{children}
		</View>
	);
};

export default Layout;
