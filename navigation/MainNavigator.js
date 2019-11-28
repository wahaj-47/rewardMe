import React from "react";
import {
	Image,
	TouchableOpacity,
	StyleSheet,
	View,
	AppState
} from "react-native";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Asset } from "expo-asset";
import { Notifications } from "expo";

import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import NoticeScreen from "../screens/NoticeScreen";
import LogScreen from "../screens/LogScreen";
import ContactScreen from "../screens/ContactScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SettingScreen from "../screens/SettingScreen";
import SideBar from "../components/SideBar";

class Burger extends React.Component {
	state = {
		appState: AppState.currentState,
		notificationCount: 0
	};

	componentDidMount() {
		AppState.addEventListener("change", this._handleAppStateChange);
	}

	_handleAppStateChange = async nextAppState => {
		if (nextAppState === "active") {
			this.setState({
				notificationCount: await Notifications.getBadgeNumberAsync()
			});
		}
	};

	render() {
		return (
			<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
				<Image
					source={Asset.fromModule(require("../assets/images/menu.png"))}
					style={{ tintColor: "#61DEFF", marginLeft: 10 }}
				></Image>
				{this.state.notificationCount > 0 && (
					<View
						style={{
							position: "absolute",
							borderRadius: 100,
							backgroundColor: "#61DEFF",
							width: 10,
							height: 10,
							zIndex: 1,
							left: 34
						}}
					></View>
				)}
			</TouchableOpacity>
		);
	}
}

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
			headerLeft: () => <Burger navigation={navigation}></Burger>
		})
	}
);

export default ContainerStackNavigator;
