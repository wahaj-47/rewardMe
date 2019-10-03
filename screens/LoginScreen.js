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

export default class LoginScreen extends React.Component {
	state = {
		email: "",
		password: ""
	};

	handleEmailChange = email => {
		this.setState({ email: email });
	};

	handlePasswordChange = pasword => {
		this.setState({ pasword: pasword });
	};

	handleLoginPress = () => {
		console.log("login button pressed");
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
						placeholder="Enter your email here"
					/>
					<TextInput
						style={styles.textBox}
						value={this.state.password}
						onChangeText={this.handlePasswordChange}
						placeholder="Enter your password here"
					/>

					<TouchableOpacity
						style={styles.loginButton}
						onPress={() => {
							this.props.navigation.navigate("Signup");
							console.log("login button pressed");
						}}
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
				>
					<Text style={styles.text}>Forgot Password?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("Main");
					}}
				>
					<Text style={styles.text}>Home</Text>
				</TouchableOpacity>
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
		borderBottomColor: "white"
	},
	logo: {
		height: 150,
		width: 240
	}
});
