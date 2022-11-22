import React, {FC} from "react";
import styled from "styled-components/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

interface IButton {
  title: string;
  onPress: () => void;
  style?: any;
  danger?: boolean;
  active?: boolean;
  width?: number;
}

const Button: FC<IButton> = ({
                               title,
                               onPress,
                               style,
                               active = true,
                               danger = false,
                               width = 100,
                             }) => {
  const colorscheme = useColorScheme();
  const Wrapper = styled.TouchableHighlight`
		width: ${width}%;
		padding: ${Layout.isSmallDevice ? 10 : 15}px;
		border-radius: 7px;
		background-color: ${danger
    ? Colors[colorscheme].dangerColor
    : !active
      ? Colors[colorscheme].background
      : Colors[colorscheme].tint};
		margin-top: 10px;
		margin-bottom: 10px;
		${!active ? `border: 2px solid ` + Colors[colorscheme].tint : ""}
	`;
  const Title = styled.Text`
		color: ${Colors[colorscheme].text};
		text-align: center;
		font-weight: bold;
	`;

  return (
    <Wrapper
      underlayColor={Colors[colorscheme].tabIconDefault}
      onPress={onPress}
      style={style}
    >
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default Button;
