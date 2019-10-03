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

export default function NoticeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>NoticeScreen</Text>
		</View>
	);
}

NoticeScreen.navigationOptions = ({ navigation }) => {
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
	}
});
