import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthStack from "./AuthStackNavigator";
import MainDrawerNavigator from "./MainDrawerNavigator";

export default createAppContainer(
	createSwitchNavigator(
		{
			// You could add another route here for authentication.
			// Read more at https://reactnavigation.org/docs/en/auth-flow.html
			Auth: AuthStack,
			Main: MainDrawerNavigator
		},
		{
			initialRouteName: "Auth",
			drawerType: "front"
		}
	)
);
