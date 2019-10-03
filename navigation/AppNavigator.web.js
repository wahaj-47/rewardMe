import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator } from "react-navigation";

import ContainerStackNavigator from "./MainNavigator";
import AuthStack from "./AuthStackNavigator";

const switchNavigator = createSwitchNavigator(
	{
		// You could add another route here for authentication.
		// Read more at https://reactnavigation.org/docs/en/auth-flow.html
		Auth: AuthStack,
		Main: ContainerStackNavigator
	},
	{
		initialRouteName: "Auth",
		drawerType: "front"
	}
);
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });
