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

export default function AboutScreen() {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require("../assets/images/Logo/logo.png")}
			></Image>
			<View>
				<Text style={styles.text}>AboutScreen</Text>
			</View>
		</View>
	);
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
	logo: {
		height: 150,
		width: 240
	}
});
