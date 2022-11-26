import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";
import React, {FC, useState} from "react";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {TimePicker, ValueMap} from "react-native-simple-time-picker";
import {FadeInView} from "../components/FadeInView";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import Label from "../components/ui/Label";
import {useAd} from "../hooks/useAd";
import {useAsyncStorage} from "../hooks/useAsyncStorage";
import {RootTabScreenProps} from "../types";
import {useTheme} from "@react-navigation/native";

export interface ICreateAd {
  title: string;
  description: string;
  address: string;
  payment: number;
  limit: number;
}

const AddFormAd: FC<RootTabScreenProps<"AddForm">> = ({navigation}) => {
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
  const {createAd, setAd, createSchedule} = useAd();
  const {colors} = useTheme()
  useAsyncStorage("create_ad_form", setData, data);


  const createHandler = async () => {
    const ad = await createAd(data);
    if (ad) {
      await AsyncStorage.removeItem("create_ad_form");
      setData({} as ICreateAd);
      setAd(ad);
      await createSchedule(ad, start, stop, weekDay);
      setStart({
        hours: 9,
        minutes: 0,
        seconds: 0,
      });
      setStop({
        hours: 13,
        minutes: 0,
        seconds: 0,
      });
      navigation.navigate("AdDetail");
    }
  };

  return (
    <Layout>
      <FadeInView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({ios: 100, android: 100})}
          style={{flex: 1}}
          behavior="padding"
        >
          <ScrollView>
            <Field
              autoCapitalize={true}
              placeholder="Введите заголовок объявления"
              val={data.title}
              onChange={(value) => setData({...data, title: value})}
            />
            <Field
              autoCapitalize={true}
              placeholder="Введите описание объявления"
              val={data.description}
              multiline={true}
              onChange={(value) => setData({...data, description: value})}
            />
            <Field
              placeholder="Введите цену за час"
              val={data.payment ? String(data.payment) : ""}
              keyboardType="number-pad"
              onChange={(value) => setData({...data, payment: Number(value)})}
            />
            <Field
              placeholder="Введите количество искомых работников"
              val={data.limit ? String(data.limit) : ""}
              keyboardType="number-pad"
              onChange={(value) => setData({...data, limit: Number(value)})}
            />
            <Field
              placeholder="Введите адрес"
              val={data.address}
              contentType="fullStreetAddress"
              onChange={(value) => setData({...data, address: value})}
            />
            <Label>Время начала</Label>
            <TimePicker
              value={start}
              onChange={(value) => setStart(value)}
              mode="dialog"
              zeroPadding={true}
              style={{
                width: 200,
                color: colors.text,
                height: 50,
              }}
              itemStyle={{
                height: 50,
                color: colors.text,
              }}
            />
            <Label>Время окончания</Label>
            <TimePicker
              value={stop}
              onChange={(value) => setStop(value)}
              mode="dialog"
              itemStyle={{
                height: 50,
                color: colors.text,
              }}
              zeroPadding={true}
              style={{
                color: colors.text,
                width: 200,
                height: 50,
              }}
            />
            <Label>День недели</Label>
            <Picker
              selectedValue={weekDay}
              mode="dialog"
              style={{
                width: "100%",
                color: colors.text,
                height: 50,
                justifyContent: "center",
              }}
              itemStyle={{
                height: 50,
                color: colors.text,
              }}
              onValueChange={(value) => setWeekDay(value)}
            >
              <Picker.Item label="Понедельник" value={0}/>
              <Picker.Item label="Вторник" value={1}/>
              <Picker.Item label="Среда" value={2}/>
              <Picker.Item label="Четверг" value={3}/>
              <Picker.Item label="Пятница" value={4}/>
              <Picker.Item label="Суббота" value={5}/>
              <Picker.Item label="Воскресенье" value={6}/>
            </Picker>
            <Button title="Создать объявление" onPress={createHandler}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </FadeInView>
    </Layout>
  );
};

export default AddFormAd;
