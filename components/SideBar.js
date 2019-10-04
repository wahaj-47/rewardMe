import React from "react";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerNavigatorItems } from "react-navigation-drawer";

const CustomDrawerContentComponent = props => (
	<ScrollView>
		<SafeAreaView
			style={styles.container}
			forceInset={{ top: "always", horizontal: "never" }}
		>
			<View style={{ alignItems: "center" }}>
				<Image
					style={{ width: 140, height: 88 }}
					source={require("../assets/images/Logo/logo.png")}
				></Image>
				<Text style={styles.text}>
					Welcome <Text>Username</Text>
				</Text>
			</View>
			<DrawerNavigatorItems {...props} />
		</SafeAreaView>
	</ScrollView>
);

export default CustomDrawerContentComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	text: {
		color: "#fff",
		marginTop: 15,
		fontSize: 15,
		textAlign: "center",
		fontStyle: "italic"
	}
});
