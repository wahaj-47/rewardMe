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
		fname: "",
		lname: "",
		email: "",
		password: "",
		phoneNumber: "",
		isFormValid: false,
		isEmailValid: true,
		isEmailIncorrect: false
	};

	componentDidMount() {
		this.setState({ api: this.props.screenProps.api });
	}

	handleFirstNameChange = fname => {
		console.log(fname);
		this.setState({ fname: fname });
	};

	handleLastNameChange = lname => {
		console.log(lname);
		this.setState({ lname: lname });
	};

	handleEmailChange = email => {
		this.setState({ email: email });
	};

	handlePhoneNumberChange = phoneNumber => {
		console.log(phoneNumber);
		this.setState({ phoneNumber: phoneNumber });
	};

	handlePasswordChange = password => {
		this.setState({ password: password });
	};

	handleSignUpPress = async () => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		this.setState({ buttonPressed: true });

		if (reg.test(this.state.email) === false) {
			this.setState({
				isEmailIncorrect: true,
				buttonPressed: false
			});
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
					name: this.state.fname + " " + this.state.lname,
					email: this.state.email,
					password: this.state.password,
					phoneNumber: this.state.phoneNumber
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
			<View style={{ flex: 1, backgroundColor: "#000" }}>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.container}
					scrollEnabled={true}
					enableOnAndroid={true}
					enableAutomaticScroll={true}
					extraScrollHeight={30}
				>
					<View style={styles.form}>
						<View style={styles.headingContainer}>
							<Text style={styles.mainHeading}>Sign Up</Text>
							<Text style={styles.subHeading}>Sign Up to join</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						>
							<View style={[styles.subContainer, { width: 125 }]}>
								<Text style={styles.headings}>First Name</Text>
								<TextInput
									textContentType="name"
									autoCapitalize="words"
									style={styles.textBox}
									value={this.state.fname}
									onChangeText={this.handleFirstNameChange}
									placeholder="Enter your first name here"
								/>
							</View>
							<View style={[styles.subContainer, { width: 125 }]}>
								<Text style={styles.headings}>Last Name</Text>
								<TextInput
									textContentType="name"
									autoCapitalize="words"
									style={styles.textBox}
									value={this.state.lname}
									onChangeText={this.handleLastNameChange}
									placeholder="Enter your last name here"
								/>
							</View>
						</View>
						<View style={styles.subContainer}>
							<Text style={styles.headings}>Phone Number</Text>
							<TextInput
								keyboardType="phone-pad"
								textContentType="telephoneNumber"
								autoCompleteType="tel"
								autoCapitalize="none"
								style={styles.textBox}
								value={this.state.phoneNumber}
								onChangeText={this.handlePhoneNumberChange}
								placeholder="Enter your phone number here"
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
							<Text
								style={{
									color: "red",
									fontSize: 10,
									alignSelf: "center"
								}}
							>
								Email already in use
							</Text>
						)}

						{this.state.isEmailIncorrect && (
							<Text
								style={{
									color: "red",
									fontSize: 10,
									alignSelf: "center"
								}}
							>
								Invalid Email
							</Text>
						)}

						<TouchableOpacity
							disabled={
								!(
									this.state.fname.length > 0 &&
									this.state.lname.length > 0 &&
									this.state.email.length > 0 &&
									this.state.password.length > 7 &&
									this.state.phoneNumber.length > 0
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
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1,
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
		width: "80%",
		paddingBottom: 60
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
