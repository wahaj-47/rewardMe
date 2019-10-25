import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	View,
	Keyboard,
	AsyncStorage,
	ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class LoginScreen extends React.Component {
	state = {
		email: "",
		password: "",
		loggedIn: true,
		loginPressed: false,
		api: this.props.screenProps.api
	};

	async componentDidMount() {
		if (await this.retrieveData()) {
			this.props.navigation.navigate("Home");
		}
	}

	retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem("token");
			if (value !== null) {
				this.setState({ token: value });
				return 1;
			} else {
				return 0;
			}
		} catch (error) {
			console.log(error);
		}
	};

	handleEmailChange = email => {
		this.setState({ email: email });
	};

	handlePasswordChange = password => {
		this.setState({ password: password });
	};

	handleLoginPress = async () => {
		console.log("login button pressed");

		this.setState({ loginPressed: true });

		let response = await axios.post(this.state.api + "/login", {
			email: this.state.email,
			password: this.state.password
		});
		console.log(response.data);
		console.log(response.data.isVerified);

		if (response.data.loggedIn && response.data.isVerified) {
			try {
				await AsyncStorage.setItem("token", response.data.token);
			} catch (error) {
				console.log(error);
			}
			this.props.navigation.navigate("Home");
		} else if (
			!response.data.isVerified &&
			typeof response.data.isVerified !== "undefined"
		) {
			this.setState({
				loginPressed: false
			});
			let res = await axios.post(
				this.state.api + "/signUp/sendVerificationEmail",
				{
					email: this.state.email
				}
			);
			if (res.data.emailSent) {
				this.setState({ loggedIn: true });
				this.props.navigation.navigate("VerifyEmail", {
					email: this.state.email
				});
			}
		} else {
			this.setState({ loggedIn: response.data.loggedIn, loginPressed: false });
		}
	};

	render() {
		return (
			<KeyboardAwareScrollView
				contentContainerStyle={styles.container}
				scrollEnabled={false}
				enableOnAndroid={true}
			>
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
						secureTextEntry
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
						disabled={
							!(this.state.email.length > 0 && this.state.password.length > 0)
						}
						style={styles.loginButton}
						onPress={this.handleLoginPress}
					>
						{this.state.loginPressed ? (
							<ActivityIndicator></ActivityIndicator>
						) : (
							<Text style={styles.loginText}>LOGIN</Text>
						)}
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
			</KeyboardAwareScrollView>
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
