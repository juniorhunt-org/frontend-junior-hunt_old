import { useFocusEffect } from "@react-navigation/native";
import { FC, useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IFadeInView {
	children: React.ReactNode;
}

export const FadeInView: FC<IFadeInView> = ({ children }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useFocusEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
		return () => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start();
		};
	});

	return (
		<Animated.View
			style={{
				flex: 1,
				opacity: fadeAnim,
			}}
		>
			{children}
		</Animated.View>
	);
};
