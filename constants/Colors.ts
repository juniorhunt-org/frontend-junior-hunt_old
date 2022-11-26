import {DarkTheme, DefaultTheme} from "@react-navigation/native";

const tintColor = "#51ad72";

export const LightCustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: tintColor,
    border: tintColor,
    notification: '#ED2939'
  }
}

export const DarkCustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#151515',
    primary: tintColor,
    border: tintColor,
    notification: '#A7171A'
  }
}