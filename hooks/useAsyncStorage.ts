import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const useAsyncStorage = (
	key: string,
	setter: (value: any) => void,
	value: any
) => {
	useEffect(() => {
		loadStorage();
	}, []);

	useEffect(() => {
		writeStorage(value);
	}, [value]);

	const loadStorage = async () => {
		const storage_data = await AsyncStorage.getItem(key);
		console.log(key, storage_data);
		if (storage_data) {
			setter(JSON.parse(storage_data));
		}
	};

	const writeStorage = async (data: any) => {
		await AsyncStorage.setItem(key, JSON.stringify(data));
	};

	return { loadStorage, writeStorage };
};
