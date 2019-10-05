import React from "react";
import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen.js";
import SignUpScreen from "../screens/SignUpScreen.js";
import ResetPassScreen from "../screens/ResetPassScreen.js";
import ForgotPassScreen from "../screens/ForgotPassScreen.js";

const AuthStack = createStackNavigator({
	Login: LoginScreen,
	Signup: SignUpScreen,
	ForgotPassword: ForgotPassScreen,
	ResetPassword: ResetPassScreen
});

export default AuthStack;
