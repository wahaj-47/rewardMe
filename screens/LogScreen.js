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

export default function LogScreen() {
	return (
		<View>
			<Text style={styles.container}>LogScreen</Text>
		</View>
	);
}

LogScreen.navigationOptions = {
	header: null
};
