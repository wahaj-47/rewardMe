import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Asset } from "expo-asset";

import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import NoticeScreen from "../screens/NoticeScreen";
import LogScreen from "../screens/LogScreen";
import ContactScreen from "../screens/ContactScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SettingScreen from "../screens/SettingScreen";
import SideBar from "../components/SideBar";

const AboutStack = createStackNavigator({
	About: {
		screen: AboutScreen,
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: "black"
			},
			headerTintColor: "white",
			header: null,
			headerForceInset: { top: "never", bottom: "never" }
		})
	},
	"Privacy Policy": {
		screen: PrivacyPolicyScreen,
		navigationOptions: ({ navigation }) => ({
			title: "Privacy Policy",
			headerStyle: {
				marginTop: 0,
				backgroundColor: "black"
			},
			headerTintColor: "white",
			headerForceInset: { top: "never", bottom: "never" }
		})
	}
});

const MainDrawerNavigator = createDrawerNavigator(
	{
		Home: HomeScreen,
		About: AboutStack,
		Notice: NoticeScreen,
		Log: LogScreen,
		"Contact Us": ContactScreen,
		Settings: SettingScreen
	},
	{
		contentComponent: SideBar,
		contentOptions: {
			activeTintColor: "#ffffff",
			inactiveTintColor: "#c9c9c9",
			activeBackgroundColor: "transparent",
			itemStyle: {
				width: "70%",
				alignSelf: "center",
				justifyContent: "center"
			},
			itemsContainerStyle: {
				borderBottomColor: "#ffffff",
				borderBottomWidth: StyleSheet.hairlineWidth
			}
		},
		initialRouteName: "Home",
		drawerBackgroundColor: "#1f1f1f",
		drawerWidth: 170
	}
);

const ContainerStackNavigator = createStackNavigator(
	{
		Main: MainDrawerNavigator
	},
	{
		headerLayoutPreset: "center",
		defaultNavigationOptions: ({ navigation }) => ({
			title: "MERCEDES HAIRDRESSING",
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontSize: 13,
				width: 100 + "%"
			},
			headerStyle: {
				backgroundColor: "#1f1f1f",
				borderBottomColor: "#fff"
			},
			headerLeft: (
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<Image
						source={Asset.fromModule(require("../assets/images/menu.png"))}
						style={{ tintColor: "#61DEFF", marginLeft: 10 }}
					></Image>
				</TouchableOpacity>
			)
		})
	}
);

export default ContainerStackNavigator;
