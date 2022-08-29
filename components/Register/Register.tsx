import { View, Text } from "react-native";
import React, { useState } from "react";
import Button from "../ui/Button";
import School from "./School";
import Row from "../ui/Row";
import Layout from "../layout/Layout";

const Register = () => {
	const [isCompany, setIsCompany] = useState(false);

	return (
		<>
			<Row>
				<Button
					title="I school"
					active={!isCompany}
					width={48}
					onPress={() => setIsCompany(false)}
				/>
				<Button
					title="I employer"
					width={48}
					active={isCompany}
					onPress={() => setIsCompany(true)}
				/>
			</Row>
			{isCompany ? (
				<Layout>
					<Text>Company</Text>
				</Layout>
			) : (
				<School />
			)}
		</>
	);
};

export default Register;
