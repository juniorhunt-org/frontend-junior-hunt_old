import { View, Text } from "react-native";
import React, { FC } from "react";

interface ILayout {
	children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
	return (
		<View
			style={{
				paddingHorizontal: 32,
				height: "100%",
				marginTop: 64,
				alignItems: "center",
			}}
		>
			{children}
		</View>
	);
};

export default Layout;
