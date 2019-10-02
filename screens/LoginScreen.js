import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

import { MonoText } from "../components/StyledText";
import { TextInput } from "react-native-gesture-handler";

export default function LoginScreen(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>LoginScreen</Text>
			<TouchableOpacity
				onPress={() => {
					props.navigation.navigate("Signup");
					console.log(props);
				}}
			>
				<Text style={styles.text}>Sign Up</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					props.navigation.navigate("ForgotPassword");
				}}
			>
				<Text style={styles.text}>Forgot Password</Text>
			</TouchableOpacity>
		</View>
	);
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
	}
});
