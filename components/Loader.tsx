import {ActivityIndicator} from "react-native";
import React from "react";
import styled from "styled-components/native";
import {useTheme} from "@react-navigation/native";

const Loader = () => {
  const {colors} = useTheme()

  const Wrapper = styled.View`
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  `;

  const Title = styled.Text`
    color: ${colors.text};
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  `;

  return (
    <Wrapper>
      <Title>Загрузка ...</Title>
      <ActivityIndicator size="large"/>
    </Wrapper>
  );
};

export default Loader;
