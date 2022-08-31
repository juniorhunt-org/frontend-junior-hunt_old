import { Modal } from "react-native";
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
					title="Я школьник"
					active={!isCompany}
					width={48}
					onPress={() => setIsCompany(false)}
				/>
				<Button
					title="Я бизнес"
					width={48}
					active={isCompany}
					onPress={() => setIsCompany(true)}
				/>
			</Row>
			<>{isCompany ? <Company />  : <School />}</>
		</>
	);
};

export default Register;
