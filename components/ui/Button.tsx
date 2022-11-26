import React, {FC} from "react";
import styled from "styled-components/native";
import Layout from "../../constants/Layout";
import {useTheme} from "@react-navigation/native";

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
  const {colors} = useTheme();
  const Wrapper = styled.TouchableHighlight`
    width: ${width}%;
    padding: ${Layout.isSmallDevice ? 10 : 15}px;
    border-radius: 7px;
    background-color: ${danger
            ? colors.notification
            : !active
                    ? colors.background
                    : colors.primary};
    margin-top: 10px;
    margin-bottom: 10px;
    ${!active ? `border: 2px solid ` + colors.primary : ""}
  `;
  const Title = styled.Text`
    color: ${colors.text};
    text-align: center;
    font-weight: bold;
  `;

  return (
    <Wrapper
      underlayColor={colors.card}
      onPress={onPress}
      style={style}
    >
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default Button;
