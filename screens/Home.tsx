import { StyleSheet } from "react-native";
import Loader from "../components/Loader";
import { Text, View } from "../components/Themed";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
	const { user, isLoading } = useAuth();

	return (
		<View style={styles.container}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Text style={styles.title}>
						Здравствуйте, {user.detailInfo.first_name}
					</Text>
					<View
						style={styles.separator}
						lightColor="#eee"
						darkColor="rgba(255,255,255,0.1)"
					/>
				</>
			)}
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
