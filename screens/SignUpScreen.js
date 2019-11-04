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

export default class SignUpScreen extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		isFormValid: false,
		isEmailValid: true,
		isEmailIncorrect: false
	};

	componentDidMount() {
		this.setState({ api: this.props.screenProps.api });
	}

	handleNameChange = name => {
		this.setState({ name: name });
		if (
			this.state.name.length > 0 &&
			this.state.email.length > 0 &&
			this.state.password.length > 6
		) {
			this.setState({ isFormValid: true });
		} else {
			this.setState({ isFormValid: false });
		}
	};

	handleEmailChange = email => {
		this.setState({ email: email });
		if (
			this.state.name.length > 0 &&
			this.state.email.length > 0 &&
			this.state.password.length > 6
		) {
			this.setState({ isFormValid: true });
		} else {
			this.setState({ isFormValid: false });
		}
	};

	handlePasswordChange = password => {
		this.setState({ password: password });
	};

	handleSignUpPress = async () => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		this.setState({ buttonPressed: true });

		if (reg.test(this.state.email) === false) {
			this.setState({ isEmailIncorrect: true, buttonPressed: false });
		} else {
			console.log("Signup button pressed");
			let response = await axios.post(
				this.state.api + "/signUp/checkExisting",
				{
					email: this.state.email
				}
			);

			if (response.data.isEmailValid) {
				let res = await axios.post(this.state.api + "/signUp", {
					name: this.state.name,
					email: this.state.email,
					password: this.state.password
				});
				console.log(res.data);
				if (res.data.success) {
					this.setState({ buttonPressed: false });
					this.props.navigation.navigate("VerifyEmail", {
						name: this.state.name,
						email: this.state.email,
						password: this.state.password
					});
				}
			} else {
				this.setState({
					isEmailValid: response.data.isEmailValid,
					buttonPressed: false
				});
			}
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
						<Text style={styles.mainHeading}>Sign Up</Text>
						<Text style={styles.subHeading}>Sign Up to join</Text>
					</View>

					<View style={styles.subContainer}>
						<Text style={styles.headings}>Name</Text>
						<TextInput
							textContentType="name"
							autoCapitalize="words"
							style={styles.textBox}
							value={this.state.name}
							onChangeText={this.handleNameChange}
							placeholder="Enter your name here"
						/>
					</View>

					<View style={styles.subContainer}>
						<Text style={styles.headings}>Email</Text>
						<TextInput
							textContentType="emailAddress"
							autoCapitalize="none"
							keyboardType="email-address"
							autoCompleteType="email"
							style={styles.textBox}
							value={this.state.email}
							onChangeText={this.handleEmailChange}
							placeholder="Enter your email here"
						/>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.headings}>Password</Text>
						<TextInput
							textContentType="password"
							autoCompleteType="password"
							autoCapitalize="none"
							style={styles.textBox}
							value={this.state.password}
							onChangeText={this.handlePasswordChange}
							placeholder="Enter your password here"
							secureTextEntry
						/>
					</View>

					<Text style={[styles.text, { fontSize: 10, alignSelf: "center" }]}>
						Password must be at least 8 characters long
					</Text>

					{!this.state.isEmailValid && (
						<Text style={{ color: "red", fontSize: 10, alignSelf: "center" }}>
							Email already in use
						</Text>
					)}

					{this.state.isEmailIncorrect && (
						<Text style={{ color: "red", fontSize: 10, alignSelf: "center" }}>
							Invalid Email
						</Text>
					)}

					<TouchableOpacity
						disabled={
							!(
								this.state.name.length > 0 &&
								this.state.email.length > 0 &&
								this.state.password.length > 7
							)
						}
						style={styles.signUpButton}
						onPress={this.handleSignUpPress}
					>
						{this.state.buttonPressed ? (
							<ActivityIndicator></ActivityIndicator>
						) : (
							<Text style={styles.signUpText}>SIGN UP</Text>
						)}
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
