import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
	useEffect(() => {
		console.log("start request");
		fetch("http://localhost/api/ads/ad/?format=json")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Home 2</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
