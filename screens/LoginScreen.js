import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	View
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

{
	/** 
import { MonoText } from "../components/StyledText";

*/
}

export default class LoginScreen extends React.Component {
	state = {
		email: "",
		password: "",
		isFormValid: false,
		loggedIn: true
	};

	componentDidMount() {
		const { manifest } = Constants;
		const api =
			typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
				? manifest.debuggerHost
						.split(`:`)
						.shift()
						.concat(`:4000`)
				: `api.example.com`;
		this.setState({ api });
	}

	handleEmailChange = email => {
		this.setState({ email: email });
		if (this.state.email.length > 0 && this.state.password.length > 0) {
			this.setState({ isFormValid: true });
		} else {
			this.setState({ isFormValid: false });
		}
	};

	handlePasswordChange = password => {
		this.setState({ password: password });
		if (this.state.email.length > 0 && this.state.password.length > 0) {
			this.setState({ isFormValid: true });
		} else {
			this.setState({ isFormValid: false });
		}
	};

	handleLoginPress = async () => {
		console.log("login button pressed");

		let response = await axios.post("http://" + this.state.api + "/login", {
			email: this.state.email,
			password: this.state.password
		});

		if (response.data.loggedIn) {
			this.props.navigation.navigate("Home", { token: response.data.token });
		} else {
			this.setState({ loggedIn: response.data.loggedIn });
		}
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<Image
					style={styles.logo}
					source={require("../assets/images/Logo/logo.png")}
				></Image>

				<View style={styles.form}>
					<TextInput
						style={styles.textBox}
						value={this.state.email}
						onChangeText={this.handleEmailChange}
						placeholder="Email"
						placeholderTextColor="#c9c9c9"
						autoCompleteType="email"
						autoCapitalize="none"
						keyboardType="email-address"
					/>
					<TextInput
						style={styles.textBox}
						value={this.state.password}
						onChangeText={this.handlePasswordChange}
						placeholder="Password"
						placeholderTextColor="#c9c9c9"
						autoCompleteType="password"
						autoCapitalize="none"
					/>

					{!this.state.loggedIn ? (
						<Text style={{ color: "red", alignSelf: "center" }}>
							Incorrect email or password
						</Text>
					) : (
						<></>
					)}

					<TouchableOpacity
						disabled={!this.state.isFormValid}
						style={styles.loginButton}
						onPress={this.handleLoginPress}
					>
						<Text style={styles.loginText}>LOGIN</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("Signup");
						console.log("signup button is pressed");
					}}
				>
					<Text style={styles.text}>Click here to Sign Up</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("ForgotPassword");
					}}
					style={{ marginTop: 10 }}
				>
					<Text style={styles.text}>Forgot Password?</Text>
				</TouchableOpacity>

				{/* <TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("Main");
					}}
				>
					<Text style={styles.text}>Home</Text>
				</TouchableOpacity> */}
			</KeyboardAvoidingView>
		);
	}
}
LoginScreen.navigationOptions = {
	header: null
};

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
	loginText: {
		color: "#fff",
		alignSelf: "center"
	},
	form: {
		marginTop: 50,
		justifyContent: "center",
		width: "80%"
	},
	loginButton: {
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
	}
});
