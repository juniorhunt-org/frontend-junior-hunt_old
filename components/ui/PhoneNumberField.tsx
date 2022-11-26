import React, {FC, useRef} from "react";
import PhoneInput from "react-native-phone-number-input";
import Layout from "../../constants/Layout";
import {useTheme} from "@react-navigation/native";

interface IPhoneNumberField {
  value: string;
  setValue: (value: string) => void;
  setFormatted: (value: string) => void;
}

const PhoneNumberField: FC<IPhoneNumberField> = ({
                                                   value,
                                                   setFormatted,
                                                   setValue,
                                                 }) => {
  const {colors} = useTheme()
  const phoneInput = useRef<PhoneInput>(null);
  const {isSmallDevice} = Layout;

  return (
    <PhoneInput
      placeholder="Введите номер телефона"
      textInputStyle={{
        fontSize: isSmallDevice ? 10 : 13,
        height: 100,
        color: colors.text,
      }}
      ref={phoneInput}
      defaultValue={value}
      onChangeText={setValue}
      onChangeFormattedText={setFormatted}
      layout="second"
      textContainerStyle={{
        borderRadius: 10,
        backgroundColor: colors.background,
      }}
      containerStyle={{
        backgroundColor: colors.primary,
        width: "100%",
        borderWidth: 2,
        marginTop: 10,
        borderColor: colors.primary,
        borderRadius: 10,
        height: 50,
      }}
      defaultCode="RU"
    />
  );
};

export default PhoneNumberField;
