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
		<ScrollView style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingLeft: 5,
					paddingVertical: 10,
					borderTopColor: "#fff",
					borderTopWidth: StyleSheet.hairlineWidth,
					borderBottomColor: "#fff",
					borderBottomWidth: StyleSheet.hairlineWidth
				}}
			>
				<Image source={require("../assets/images/notice.png")}></Image>
				<Text style={styles.text}>Notice Title</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000"
	},
	text: {
		color: "#fff",
		marginLeft: 10
	}
});
