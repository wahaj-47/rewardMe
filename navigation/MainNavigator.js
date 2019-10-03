import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import NoticeScreen from "../screens/NoticeScreen";
import LogScreen from "../screens/LogScreen";
import ContactScreen from "../screens/ContactScreen";

const MainDrawerNavigator = createDrawerNavigator(
	{
		Home: HomeScreen,
		About: AboutScreen,
		Notice: NoticeScreen,
		Log: LogScreen,
		"Contact Us": ContactScreen
	},
	{
		initialRouteName: "Home",
		drawerBackgroundColor: "#1f1f1f"
	}
);

const ContainerStackNavigator = createStackNavigator(
	{
		Main: MainDrawerNavigator
	},
	{
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
						source={require("../assets/images/menu.png")}
						style={{ tintColor: "#61DEFF", marginLeft: 5 }}
					></Image>
				</TouchableOpacity>
			)
		})
	}
);

export default ContainerStackNavigator;
