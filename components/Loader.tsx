import {ActivityIndicator} from "react-native";
import React from "react";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const Loader = () => {
  const colorscheme = useColorScheme();

  const Wrapper = styled.View`
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	`;

  const Title = styled.Text`
		color: ${Colors[colorscheme].text};
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
