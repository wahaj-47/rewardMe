import React from "react";
import { createDrawerNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import NoticeScreen from "../screens/NoticeScreen";
import LogScreen from "../screens/LogScreen";
import ContactUsScreen from "../screens/ContactScreen";

const MainDrawerNavigator = createDrawerNavigator(
	{
		Home: HomeScreen,
		About: AboutScreen,
		Notice: NoticeScreen,
		Log: LogScreen,
		ContactUs: ContactUsScreen
	},
	{
		initialRouteName: "Home"
	}
);

export default MainDrawerNavigator;
