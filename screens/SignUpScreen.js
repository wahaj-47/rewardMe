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
import Layout from "../constants/Layout";
{
	/** 
import { MonoText } from "../components/StyledText";

*/
}

export default class SignUpScreen extends React.Component {
	state = {
		name: "",
		email: "",
		password: ""
	};
	handleNameChange = name => {
		this.setState({ name: name });
	};
	handleEmailChange = email => {
		this.setState({ email: email });
	};

	handlePasswordChange = pasword => {
		this.setState({ pasword: pasword });
	};

	handleSignUpPress = () => {
		console.log("Signup button pressed");
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<View style={styles.form}>
					<View style={styles.headingContainer}>
						<Text style={styles.mainHeading}>Sign Up</Text>
						<Text style={styles.subHeading}>Sign Up to join</Text>
					</View>

					<View style={styles.subContainer}>
						<Text style={styles.headings}>Name</Text>
						<TextInput
							style={styles.textBox}
							value={this.state.name}
							onChangeText={this.handleNameChange}
							placeholder="Enter your name here"
						/>
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
					<View style={styles.subContainer}>
						<Text style={styles.headings}>Password</Text>
						<TextInput
							style={styles.textBox}
							value={this.state.password}
							onChangeText={this.handlePasswordChange}
							placeholder="Enter your password here"
						/>
					</View>

					<TouchableOpacity
						style={styles.signUpButton}
						onPress={() => {
							this.props.navigation.navigate("Main");
							console.log("login button pressed");
						}}
					>
						<Text style={styles.signUpText}>SIGN UP</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("Login");
						console.log("signup button is pressed");
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
