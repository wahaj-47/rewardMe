import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import NoticeScreen from "../screens/NoticeScreen";
import LogScreen from "../screens/LogScreen";
import ContactScreen from "../screens/ContactScreen";
import SideBar from "../components/SideBar";

const MainDrawerNavigator = createDrawerNavigator(
	{
		Home: HomeScreen,
		About: AboutScreen,
		Notice: NoticeScreen,
		Log: LogScreen,
		"Contact Us": ContactScreen
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
				justifyContent: "center",
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderBottomColor: "#fff"
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
				<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
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
