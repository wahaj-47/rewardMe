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

export default class ForgotPassScreen extends React.Component {
	state = {
		email: ""
	};
	handleEmailChange = email => {
		this.setState({ email: email });
	};

	handleForgotPassPress = () => {
		console.log("Forgot pass button pressed");
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
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
						/>
					</View>

					<TouchableOpacity
						style={styles.signUpButton}
						onPress={() => {
							this.props.navigation.navigate("ResetPassword");
							console.log("login button pressed");
						}}
					>
						<Text style={styles.signUpText}>Send Reset Email</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("Login");
						console.log("login button is pressed");
					}}
				>
					<Text style={styles.text}>Click here to Log in</Text>
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
