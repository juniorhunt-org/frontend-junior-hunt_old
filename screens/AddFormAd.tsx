import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { FC, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { TimePicker, ValueMap } from "react-native-simple-time-picker";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import Label from "../components/ui/Label";
import { useAd } from "../hooks/useAd";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { RootStackScreenProps } from "../types";

export interface ICreateAd {
	title: string;
	description: string;
	address: string;
	payment: number;
	limit: number;
}

const AddFormAd: FC<RootStackScreenProps<"addForm">> = ({ navigation }) => {
	const [data, setData] = useState<ICreateAd>({} as ICreateAd);
	const [start, setStart] = useState<ValueMap>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [stop, setStop] = useState<ValueMap>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [weekDay, setWeekDay] = useState<number>(1);
	const { createAd, setAd, createSchedule } = useAd();
	useAsyncStorage("create_ad_form", setData, data);

	const createHandler = async () => {
		const ad = await createAd(data);
		AsyncStorage.removeItem("create_ad_form");
		if (ad) {
			setAd(ad);
			await createSchedule(ad, start, stop, weekDay);
			navigation.navigate("Modal");
		}
	};

	return (
		<Layout>
			<ScrollView>
				<Field
					placeholder="Введите заголовок объявления"
					val={data.title}
					onChange={(value) => setData({ ...data, title: value })}
				/>
				<Field
					placeholder="Введите описание объявления"
					val={data.description}
					multiline={true}
					onChange={(value) => setData({ ...data, description: value })}
				/>
				<Field
					placeholder="Введите цену за час"
					val={data.payment ? String(data.payment) : ""}
					keyboardType="number-pad"
					onChange={(value) => setData({ ...data, payment: Number(value) })}
				/>
				<Field
					placeholder="Введите количество искомых работников"
					val={data.limit ? String(data.limit) : ""}
					keyboardType="number-pad"
					onChange={(value) => setData({ ...data, limit: Number(value) })}
				/>
				<Field
					placeholder="Введите адрес"
					val={data.address}
					contentType="fullStreetAddress"
					onChange={(value) => setData({ ...data, address: value })}
				/>
				<Label>Введите время начала работы</Label>
				<TimePicker
					value={start}
					onChange={(value) => setStart(value)}
					mode="dialog"
					zeroPadding={true}
					style={{
						width: 200,
						height: 50,
					}}
					itemStyle={{ height: 50 }}
				/>
				<Label>Введите время окончания работы</Label>
				<TimePicker
					value={stop}
					onChange={(value) => setStop(value)}
					mode="dialog"
					zeroPadding={true}
					style={{
						width: 200,
						height: 50,
					}}
					itemStyle={{ height: 50 }}
				/>
				<Label>Введите день недели работы </Label>
				<Picker
					selectedValue={weekDay}
					mode="dialog"
					style={{
						width: "100%",
						height: 50,
						justifyContent: "center",
					}}
					itemStyle={{ height: 50 }}
					onValueChange={(value) => setWeekDay(value)}
				>
					<Picker.Item label="Понедельник" value={1} />
					<Picker.Item label="Вторник" value={2} />
					<Picker.Item label="Среда" value={3} />
					<Picker.Item label="Четверг" value={4} />
					<Picker.Item label="Пятница" value={5} />
					<Picker.Item label="Суббота" value={6} />
					<Picker.Item label="Воскресенье" value={7} />
				</Picker>
				<Button title="Создать объявление" onPress={createHandler} />
			</ScrollView>
		</Layout>
	);
};

export default AddFormAd;
