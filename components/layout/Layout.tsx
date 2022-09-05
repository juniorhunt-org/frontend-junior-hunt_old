import { View } from "react-native";
import React, { FC } from "react";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

interface ILayout {
	children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
	const colorscheme = useColorScheme();
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
