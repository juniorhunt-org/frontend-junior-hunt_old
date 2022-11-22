import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import React, {useState} from "react";
import Button from "../ui/Button";
import School from "./School";
import Row from "../ui/Row";
import Company from "./Company";
import {useAsyncStorage} from "../../hooks/useAsyncStorage";
import {FadeInView} from "../FadeInView";

const Register = () => {
  const [isCompany, setIsCompany] = useState(false);
  useAsyncStorage("is_company_form", setIsCompany, isCompany);
  return (
    <FadeInView>
      <Row>
        <Button
          title="Я исполнитель"
          active={!isCompany}
          width={48}
          onPress={() => setIsCompany(false)}
        />
        <Button
          title="Я работодатель"
          width={48}
          active={isCompany}
          onPress={() => setIsCompany(true)}
        />
      </Row>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ios: 100, android: 100})}
        style={{flex: 1}}
        behavior="padding"
      >
        <ScrollView>{isCompany ? <Company/> : <School/>}</ScrollView>
      </KeyboardAvoidingView>
    </FadeInView>
  );
};

export default Register;
