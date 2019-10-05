import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	Button,
	KeyboardAvoidingView,
	View
} from "react-native";
{
	/** 
import { MonoText } from "../components/StyledText";

*/
}

export default class ResetPassScreen extends React.Component {
	state = {
		Code: "",
		password: ""
	};
	handleCodeChange = code => {
		this.setState({ code: code });
	};

	handlePasswordChange = pasword => {
		this.setState({ pasword: pasword });
	};

	handleResetPress = () => {
		console.log("Reset button pressed");
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<View style={styles.headingContainer}>
					<Text style={styles.mainHeading}>New Password</Text>
					<Text style={styles.subHeading}>
						The code has been sent to your email
					</Text>
				</View>

				<View style={styles.form}>
					<View style={styles.subContainer}>
						<Text style={styles.headings}>6 Digit Code</Text>
						<TextInput
							style={styles.textBox}
							value={this.state.code}
							onChangeText={this.handleCodeChange}
							placeholder="Enter the reset code here"
						/>
					</View>

					<View style={styles.subContainer}>
						<Text style={styles.headings}>New Password</Text>
						<TextInput
							style={styles.textBox}
							value={this.state.password}
							onChangeText={this.handlePasswordChange}
							placeholder="Enter your new password here"
						/>
					</View>

					<TouchableOpacity
						style={styles.signUpButton}
						onPress={() => {
							this.props.navigation.navigate("Main");
							console.log("login button pressed");
						}}
					>
						<Text style={styles.signUpText}>Confirm New Password</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("ResetPassword");
						console.log("login button is pressed");
					}}
				>
					<Text style={styles.text}>
						Didn't receive the code? Click here to resend.
					</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		backgroundColor: "#000"
	},
	text: {
		color: "#fff"
	},
	signUpText: {
		color: "#fff",
		alignSelf: "center"
	},
	form: {
		marginTop: 50,
		justifyContent: "center",
		width: "80%"
	},
	signUpButton: {
		backgroundColor: "#1f1f1f",
		borderRadius: 25,
		marginTop: 25,
		marginBottom: 25,
		padding: 15
	},
	textBox: {
		color: "white",
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "white",
		paddingVertical: 5,
		marginVertical: 5
	},
	logo: {
		height: 150,
		width: 240
	},
	headings: {
		fontSize: 15,
		fontWeight: "bold",
		color: "white"
	},
	subContainer: {
		paddingBottom: 20
	},
	mainHeading: {
		fontSize: 30,
		fontWeight: "bold",
		color: "white"
	},
	headingContainer: {
		paddingBottom: 30
	},
	subHeading: {
		fontSize: 15,
		color: "white"
	}
});
