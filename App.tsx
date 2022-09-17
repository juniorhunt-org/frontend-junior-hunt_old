import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { AdProvider } from "./provider/AdProvider";
import { AuthProvider } from "./provider/AuthProvider";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import NotificationProvider from "./provider/NotificationProvider";

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaView style={{ width: "100%", height: "97%" }}>
				<AuthProvider>
					<NotificationProvider>
						<AdProvider>
							<SafeAreaProvider>
								<Navigation colorScheme={colorScheme} />
							</SafeAreaProvider>
						</AdProvider>
					</NotificationProvider>
				</AuthProvider>
			</SafeAreaView>
		);
	}
}
