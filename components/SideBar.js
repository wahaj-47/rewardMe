import React from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	Image,
	Text,
	AsyncStorage
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { TouchableOpacity } from "react-native-gesture-handler";

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
			<TouchableOpacity
				onPress={async () => {
					await AsyncStorage.removeItem("token");
					props.navigation.navigate("Login");
				}}
				style={{ alignItems: "center", justifyContent: "center" }}
			>
				<View
					style={{
						width: "70%",
						paddingTop: 10,
						paddingBottom: 15,
						borderBottomWidth: StyleSheet.hairlineWidth,
						borderBottomColor: "#fff",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Text
						style={{
							color: "#c9c9c9",
							fontWeight: "bold"
						}}
					>
						Logout
					</Text>
				</View>
			</TouchableOpacity>
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
