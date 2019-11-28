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

export default class ForgotPassScreen extends React.Component {
	state = {
		api: this.props.screenProps.api,
		isEmailIncorrect: false,
		buttonPressed: false,
		email: ""
	};
	handleEmailChange = email => {
		this.setState({ email: email });
	};

	handleForgotPassPress = async () => {
		console.log("Forgot pass button pressed");

		this.setState({ buttonPressed: true });

		let response = await axios.post(this.state.api + "/forgotPassword", {
			email: this.state.email
		});

		console.log(response.data);

		if (response.data.emailSent) {
			this.setState({
				buttonPressed: false,
				isEmailIncorrect: false
			});
			this.props.navigation.navigate("ResetPassword", {
				email: this.state.email
			});
		} else {
			this.setState({ isEmailIncorrect: true, buttonPressed: false });
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
						<Text style={styles.mainHeading}>Forgot Password?</Text>
						<Text style={styles.subHeading}>Get password set Email</Text>
					</View>

					<View style={styles.subContainer}>
						<Text style={styles.headings}>Email</Text>
						<TextInput
							style={styles.textBox}
							value={this.state.email}
							onChangeText={this.handleEmailChange}
							placeholder="Enter your email here"
							autoCompleteType="email"
							autoCapitalize="none"
							keyboardType="email-address"
						/>
						{this.state.isEmailIncorrect && (
							<Text style={{ color: "red", alignSelf: "center" }}>
								This email is not registered
							</Text>
						)}
					</View>

					<TouchableOpacity
						style={styles.signUpButton}
						onPress={this.handleForgotPassPress}
						disabled={this.state.email.length === 0}
					>
						{this.state.buttonPressed ? (
							<ActivityIndicator></ActivityIndicator>
						) : (
							<Text style={styles.signUpText}>Send Reset Email</Text>
						)}
					</TouchableOpacity>
				</View>
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
		paddingBottom: 70,
		paddingTop: 50
	},
	mainHeading: {
		fontSize: 30,
		fontWeight: "bold",
		color: "white"
	},
	headingContainer: {
		justifyContent: "flex-start",
		paddingBottom: 30
	},
	subHeading: {
		fontSize: 15,
		color: "white"
	}
});
