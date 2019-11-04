import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	View,
	ActivityIndicator
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class VerifyEmailScreen extends React.Component {
	state = {
		api: this.props.screenProps.api,
		code: "",
		password: "",
		buttonPressed: false,
		isCodeIncorrect: false,
		name: this.props.navigation.getParam("name", ""),
		email: this.props.navigation.getParam("email", ""),
		password: this.props.navigation.getParam("password", "")
	};

	handleCodeChange = code => {
		this.setState({ code: code });
	};

	handleConfirm = async () => {
		console.log("Reset button pressed");

		console.log(this.state.email);

		this.setState({ buttonPressed: true });

		let response = await axios.post(this.state.api + "/signUp/verifyEmail", {
			email: this.state.email,
			verificationCode: this.state.code
		});

		console.log(response.data);

		if (response.data.emailVerified) {
			this.setState({
				buttonPressed: false,
				isCodeIncorrect: false,
				emailVerified: true
			});
			setTimeout(() => {
				this.props.navigation.navigate("Login");
			}, 2000);
		} else {
			this.setState({ isCodeIncorrect: true, buttonPressed: false });
		}
	};

	render() {
		return (
			<KeyboardAwareScrollView
				contentContainerStyle={styles.container}
				scrollEnabled={false}
				enableOnAndroid
			>
				<View style={styles.form}>
					<View style={styles.headingContainer}>
						<Text style={styles.mainHeading}>Verify Email</Text>
						<Text style={styles.subHeading}>
							The code has been sent to your email
						</Text>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.headings}>6 Digit Code</Text>
						<TextInput
							style={styles.textBox}
							value={this.state.code}
							onChangeText={this.handleCodeChange}
							placeholder="Enter the reset code here"
							autoCapitalize="characters"
						/>
					</View>

					<TouchableOpacity
						style={styles.signUpButton}
						onPress={this.handleConfirm}
					>
						{this.state.buttonPressed ? (
							<ActivityIndicator></ActivityIndicator>
						) : (
							<Text style={styles.signUpText}>Verify Email</Text>
						)}
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={async () => {
						let response = await axios.post(
							this.state.api + "/signUp/sendVerificationEmail",
							{
								name: this.state.name,
								email: this.state.email,
								password: this.state.password
							}
						);

						if (response.data.success) {
							this.setState({ emailSent: true });
							setTimeout(() => {
								this.setState({ emailSent: false });
							}, 5000);
						}
					}}
				>
					<Text style={styles.text}>
						Didn't receive the code? Click here to resend.
					</Text>
				</TouchableOpacity>
				{this.state.emailVerified && (
					<Text
						style={[
							styles.text,
							{ fontSize: 10, alignSelf: "center", color: "green" }
						]}
					>
						Email Verified
					</Text>
				)}
				{this.state.emailSent && (
					<Text style={[styles.text, { fontSize: 10, alignSelf: "center" }]}>
						Verification code sent to email
					</Text>
				)}
			</KeyboardAwareScrollView>
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
		marginTop: 30,
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
