import {FontAwesome} from "@expo/vector-icons";
import React, {FC, useState} from "react";
import {TextInput, View} from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";

interface IField {
  onChange: (val: string) => void;
  val: string;
  placeholder: string;
  width?: number;
}

const PasswordField: FC<IField> = ({
                                     onChange,
                                     placeholder,
                                     val,
                                     width = 100,
                                   }) => {
  const colorscheme = useColorScheme();
  const {isSmallDevice} = Layout;
  const [secure, setSecure] = useState(true);

  return (
    <View
      style={{
        width: `${width}%`,
        position: "relative",
        marginTop: 10,
        padding: isSmallDevice ? 5 : 10,
        borderColor: Colors[colorscheme].tint,
        backgroundColor: Colors[colorscheme].background,
        borderRadius: 10,
        borderWidth: 2,
      }}
    >
      <TextInput
        secureTextEntry={secure}
        style={{
          width: "100%",
          color: Colors[colorscheme].text,
          fontSize: isSmallDevice ? 9 : 11,
        }}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorscheme].placeholderColor}
        onChangeText={onChange}
        value={val}
      />
      <FontAwesome
        name={secure ? "eye" : "eye-slash"}
        size={isSmallDevice ? 20 : 25}
        style={{
          position: "absolute",
          left: "95%",
          bottom: "30%",
          color: Colors[colorscheme].tint,
        }}
        onPress={() => setSecure(!secure)}
      />
    </View>
  );
};

export default PasswordField;
