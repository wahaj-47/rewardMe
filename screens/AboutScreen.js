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
import { Linking } from "expo";

export default function AboutScreen() {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require("../assets/images/Logo/logo.png")}
			></Image>
			<View style={{ marginTop: 70 }}>
				<Text style={styles.text}>
					Visit our{" "}
					<Text
						onPress={() =>
							Linking.openURL("http://mercedeshairdressing.com.au")
						}
						style={{ color: "steelblue" }}
					>
						Website
					</Text>
				</Text>
			</View>
		</View>
	);
}

AboutScreen.navigationOptions = ({ navigation }) => {
	return {
		headerLeft: (
			<TouchableOpacity
				style={{ marginLeft: 5 }}
				onPress={() => navigation.openDrawer()}
			>
				<Image source={require("../assets/images/menu.png")}></Image>
			</TouchableOpacity>
		)
	};
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
	logo: {
		height: 150,
		width: 240
	}
});
