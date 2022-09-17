import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import Button from "../ui/Button";
import School from "./School";
import Row from "../ui/Row";
import Company from "./Company";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";

const Register = () => {
	const [isCompany, setIsCompany] = useState(false);
	useAsyncStorage("is_company_form", setIsCompany, isCompany);
	return (
		<>
			<Row>
				<Button
					title="Я исполнитель"
					active={!isCompany}
					width={48}
					onPress={() => setIsCompany(false)}
				/>
				<Button
					title="Я работадатель"
					width={48}
					active={isCompany}
					onPress={() => setIsCompany(true)}
				/>
			</Row>
			<KeyboardAvoidingView
				keyboardVerticalOffset={Platform.select({ ios: 100, android: 100 })}
				style={{ flex: 1 }}
				behavior="padding"
			>
				<ScrollView>{isCompany ? <Company /> : <School />}</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
};

export default Register;
