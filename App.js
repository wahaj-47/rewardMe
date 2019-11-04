import { AppLoading, Notifications } from "expo";
import { Asset } from "expo-asset";
import React, { useState, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import * as Font from "expo-font";

import AppNavigator from "./navigation/AppNavigator";

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);
	const [api, setApi] = useState("");
	const [appVersion, setVersion] = useState("");
	const [notification, setNotification] = useState({});

	useEffect(() => {
		_handleNotification = notification => {
			Notifications.setBadgeNumberAsync(1);

			console.log(notification.data.msg);
			setNotification(notification);
		};

		_notificationSubscription = Notifications.addListener(_handleNotification);

		return function cleanup() {
			_notificationSubscription.remove();
		};
	});

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={() => loadResourcesAsync(setApi, setVersion)}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		);
	} else {
		return (
			<View style={styles.container}>
				{Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
				<AppNavigator screenProps={{ api, notification, appVersion }} />
			</View>
		);
	}
}

async function loadResourcesAsync(setApi, setVersion) {
	await Promise.all([
		Asset.loadAsync([
			require("./assets/images/Logo/logo.png"),
			require("./assets/images/call.png"),
			require("./assets/images/contactimage.jpg"),
			require("./assets/images/notice.png"),
			require("./assets/images/thankyou.png"),
			require("./assets/images/menu.png"),
			require("./assets/images/camera.png"),
			require("./assets/images/qrcode.png"),
			require("./assets/images/slotUnrevealed.png"),
			require("./assets/images/slotRevealed.png"),
			require("./assets/images/happy.png"),
			require("./assets/images/checkMark.png"),
			require("./assets/images/delete.png"),
			require("./assets/sounds/qrcode.wav"),
			require("./assets/sounds/coin.wav")
		]),
		Font.loadAsync({
			footlight: require("./assets/fonts/footlight.ttf")
		})
	]);
	const { manifest } = Constants;
	const appVersion = manifest.version;
	const api =
		typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
			? "http://" +
			  manifest.debuggerHost
					.split(`:`)
					.shift()
					.concat(`:4000/rewardMe`)
			: `https://mercedeshairdressing.com/rewardMe`;
	console.log(api);
	setApi(api);
	setVersion(appVersion);
}

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
