import React, {FC, ReactNode} from "react";
import styled from "styled-components/native";
import Layout from "../../constants/Layout";
import {useTheme} from "@react-navigation/native";

interface ILabel {
  children: ReactNode;
}

const Label: FC<ILabel> = ({children}) => {
  const {colors} = useTheme();
  const {isSmallDevice} = Layout;

  const Title = styled.Text`
    font-size: ${isSmallDevice ? "15px" : "18px"};
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: bold;
    color: ${colors.text};
  `;

  return (
    <>
      <Title>{children}</Title>
    </>
  );
};

export default Label;
