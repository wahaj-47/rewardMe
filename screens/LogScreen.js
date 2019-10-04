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
import { FlatList } from "react-native-gesture-handler";

export default function LogScreen() {
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
					marginVertical: 20,
					marginRight: 10
				}}
			>
				<Text style={styles.text}>
					Total Amount Saved: <Text style={{ fontWeight: "800" }}>Amount</Text>
				</Text>
			</View>
			<FlatList
				data={[1, 2, 3, 4, 5]}
				ItemSeparatorComponent={() => (
					<View
						style={{
							height: StyleSheet.hairlineWidth,
							backgroundColor: "white"
						}}
					/>
				)}
				renderItem={({ item }) => (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingLeft: 5,
							paddingVertical: 10,
							justifyContent: "space-between"
						}}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								style={{ width: 50, height: 50, marginRight: 10 }}
								source={require("../assets/images/happy.png")}
							></Image>
							<Text style={styles.text}>
								You Saved <Text>Amount</Text>
							</Text>
						</View>
						<View style={{ marginRight: 10 }}>
							<Text style={styles.date}>Date: some-date-here</Text>
						</View>
					</View>
				)}
				keyExtractor={item => String(item)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000"
	},
	text: {
		color: "#fff",
		fontSize: 14
	},
	date: {
		color: "#fff",
		fontSize: 10
	}
});
