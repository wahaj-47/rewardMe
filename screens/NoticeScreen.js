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
		<View>
			<Text style={styles.container}>NoticeScreen</Text>
		</View>
	);
}

NoticeScreen.navigationOptions = {
	header: null
};
