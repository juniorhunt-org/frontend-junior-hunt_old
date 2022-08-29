import { View, Text } from "react-native";
import React, { FC, ReactNode } from "react";

interface IRow {
	children: ReactNode;
}

const Row: FC<IRow> = ({ children }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				width: "100%",
				justifyContent: "space-between",
			}}
		>
			{children}
		</View>
	);
};

export default Row;
