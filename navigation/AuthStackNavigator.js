import React from "react";
import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen.js";
import SignUpScreen from "../screens/SignUpScreen.js";
import ResetPassScreen from "../screens/ResetPassScreen.js";
import ForgotPassScreen from "../screens/ForgotPassScreen.js";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";

const AuthStack = createStackNavigator(
	{
		Login: LoginScreen,
		Signup: SignUpScreen,
		ForgotPassword: ForgotPassScreen,
		ResetPassword: ResetPassScreen,
		VerifyEmail: VerifyEmailScreen
	},
	{
		defaultNavigationOptions: {
			headerTintColor: "#fff",
			headerStyle: {
				backgroundColor: "#000",
				borderBottomWidth: 0
			}
		}
	}
);

export default AuthStack;
