import React, {useState} from "react";
import {Alert} from "react-native";
import Button from "../ui/Button";
import Field from "../ui/Field";
import Row from "../ui/Row";
import {useAuth} from "../../hooks/useAuth";
import {useAsyncStorage} from "../../hooks/useAsyncStorage";
import PhoneNumberField from "../ui/PhoneNumberField";
import {isValidNumber} from "react-native-phone-number-input";
import PasswordField from "../ui/PasswordField";
import {FadeInView} from "../FadeInView";

interface IData {
  first_name: string;
  last_name: string;
  password: string;
  second_password: string;
  username: string;
  email: string;
  phone: string;
  description: string;
  address: string;
}

const School = () => {
  const [data, setData] = useState<IData>({} as IData);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  useAsyncStorage("register_form_school", setData, data);

  const {register: register_school} = useAuth();

  const submitHandler = async () => {
    if (isValidNumber(formattedValue, "RU")) {
      data.phone = formattedValue;
      if (
        data.password &&
        data.second_password &&
        data.first_name &&
        data.last_name
      ) {
        register_school(
          data.email,
          data.username,
          data.password,
          data.phone,
          data.first_name,
          data.last_name
        );
      } else {
        Alert.alert("Ошибка регистрации", "Все поля обязательные");
      }
    } else {
      Alert.alert("Ошибка регистрации", "Введен некорректный номер телефона");
    }
  };

  return (
    <FadeInView>
      <Field
        val={data.username}
        onChange={(value) => setData({...data, username: value})}
        placeholder="Введите никнейм"
        contentType="username"
      />
      <PhoneNumberField
        value={value}
        setFormatted={setFormattedValue}
        setValue={setValue}
      />
      <Field
        val={data.email}
        onChange={(value) => setData({...data, email: value})}
        placeholder="Введите email"
        contentType="emailAddress"
        keyboardType="email-address"
      />
      <Row>
        <Field
          width={49}
          val={data.first_name}
          autoCapitalize={true}
          onChange={(value) => setData({...data, first_name: value})}
          placeholder="Введите имя"
        />
        <Field
          width={49}
          autoCapitalize={true}
          val={data.last_name}
          onChange={(value) => setData({...data, last_name: value})}
          placeholder="Введите фамилию"
        />
      </Row>
      <Row>
        <PasswordField
          val={data.password}
          width={49}
          onChange={(value) => setData({...data, password: value})}
          placeholder="Введите пароль"
        />
        <PasswordField
          val={data.second_password}
          width={49}
          onChange={(value) => setData({...data, second_password: value})}
          placeholder="Введите пароль"
        />
      </Row>
      <Button title="Зарегистрироваться" onPress={submitHandler}/>
    </FadeInView>
  );
};

export default School;
