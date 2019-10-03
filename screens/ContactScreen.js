import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Button
} from "react-native";

import { MonoText } from "../components/StyledText";
import { Linking } from "expo";
import Layout from "../constants/Layout";

export default function ContactScreen() {
	return (
		<View style={styles.container}>
			<View>
				<Text
					style={[
						styles.text,
						{
							position: "absolute",
							top: 135,
							left: 10,
							zIndex: 1,
							width: Layout.window.width / 2
						}
					]}
				>
					Call our friendly team today to make an appointment or to find out
					more about our services.
				</Text>
				<Image
					style={styles.image}
					source={require("../assets/images/contactimage.jpg")}
				></Image>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					console.log(Layout);
					let phoneNumber = "";
					if (Platform.OS === "android") {
						phoneNumber = "tel:${0420307744}";
					} else {
						phoneNumber = "telprompt:${0420307744}";
					}

					Linking.openURL(phoneNumber);
				}}
			>
				<Image source={require("../assets/images/call.png")}></Image>
				<Text style={styles.text}>Call Now</Text>
			</TouchableOpacity>
		</View>
	);
}

ContactScreen.navigationOptions = ({ navigation }) => {
	return {
		headerLeft: (
			<TouchableOpacity onPress={() => navigation.openDrawer()}>
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
	button: {
		borderColor: "#fff",
		borderWidth: 1,
		borderRadius: 100,
		padding: 25,
		paddingHorizontal: 33,
		alignItems: "center",
		marginVertical: 10
	},
	image: {
		width: Layout.window.width,
		height: Layout.window.width * 1.03
	}
});
