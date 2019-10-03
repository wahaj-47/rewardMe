import React from "react";
import { Image } from "react-native";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import NoticeScreen from "../screens/NoticeScreen";
import LogScreen from "../screens/LogScreen";
import ContactUsScreen from "../screens/ContactScreen";

const HomeStack = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				title: "Home",
				headerTransparent: true,
				headerTintColor: "#fff"
			}
		}
	},
	{ headerLayoutPreset: "center" }
);

const AboutStack = createStackNavigator({
	About: {
		screen: AboutScreen,
		navigationOptions: {
			title: "About",
			headerTransparent: true,
			headerTintColor: "#fff"
		}
	}
});

const NoticeStack = createStackNavigator({
	Notice: {
		screen: NoticeScreen,
		navigationOptions: {
			title: "Notice",
			headerTransparent: true,
			headerTintColor: "#fff"
		}
	}
});

const LogStack = createStackNavigator({
	Log: {
		screen: LogScreen,
		navigationOptions: {
			title: "Log",
			headerTransparent: true,
			headerTintColor: "#fff"
		}
	}
});

const ContactUsStack = createStackNavigator({
	ContactUs: {
		screen: ContactUsScreen,
		navigationOptions: {
			title: "Contact Us",
			headerTransparent: true,
			headerTintColor: "#fff"
		}
	}
});

const MainDrawerNavigator = createDrawerNavigator(
	{
		Home: HomeStack,
		About: AboutStack,
		Notice: NoticeStack,
		Log: LogStack,
		"Contact Us": ContactUsStack
	},
	{
		initialRouteName: "Home"
	}
);

export default MainDrawerNavigator;
