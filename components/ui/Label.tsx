import React, {FC, ReactNode} from "react";
import useColorScheme from "../../hooks/useColorScheme";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

interface ILabel {
  children: ReactNode;
}

const Label: FC<ILabel> = ({children}) => {
  const colorscheme = useColorScheme();
  const {isSmallDevice} = Layout;

  const Title = styled.Text`
		font-size: ${isSmallDevice ? "15px" : "18px"};
		text-align: center;
		margin-bottom: 10px;
		margin-top: 10px;
		font-weight: bold;
		color: ${Colors[colorscheme].text};
	`;

  return (
    <>
      <Title>{children}</Title>
    </>
  );
};

export default Label;
