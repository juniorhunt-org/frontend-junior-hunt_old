import { View } from "react-native";
import React, { FC } from "react";

interface ILayout {
	children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
	return (
		<View
			style={{
				paddingHorizontal: 16,
				height: "100%",
			}}
		>
			{children}
		</View>
	);
};

export default Layout;
