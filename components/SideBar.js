import React from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	Image,
	Text,
	AsyncStorage,
	AppState
} from "react-native";
import { Linking, Notifications } from "expo";

import SafeAreaView from "react-native-safe-area-view";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Asset } from "expo-asset";

class CustomDrawerContentComponent extends React.Component {
	state = {
		appState: AppState.currentState,
		name: "",
		notificationCount: 0
	};

	async componentDidMount() {
		AppState.addEventListener("change", this._handleAppStateChange);
		// this.setState({
		// 	notificationCount: await Notifications.getBadgeNumberAsync()
		// });
		try {
			const value = await AsyncStorage.getItem("name");
			if (value !== null) {
				this.setState({ name: value });
			} else {
				return 0;
			}
			const phoneNumber = await AsyncStorage.getItem("phoneNumber");
			if (phoneNumber !== null) {
				this.setState({ phoneNumber: phoneNumber });
			} else {
				return 0;
			}
			const email = await AsyncStorage.getItem("email");
			if (email !== null) {
				this.setState({ email: email });
			} else {
				return 0;
			}
		} catch (error) {
			console.log(error);
		}
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
			<ScrollView>
				<SafeAreaView
					style={styles.container}
					forceInset={{ top: "always", horizontal: "never" }}
				>
					<View style={{ alignItems: "center" }}>
						<Image
							style={{ width: 140, height: 88 }}
							source={Asset.fromModule(
								require("../assets/images/Logo/logo.png")
							)}
						></Image>
						<View style={{ marginVertical: 15 }}>
							<Text style={[styles.text, { fontSize: 10, marginBottom: -5 }]}>
								Welcome
							</Text>
							<Text style={styles.text}>{this.state.name}</Text>
						</View>
					</View>
					<View
						style={{
							width: "70%",
							borderBottomWidth: StyleSheet.hairlineWidth,
							borderBottomColor: "#fff",
							alignSelf: "center"
						}}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onShowUnderlay={() => {
								this.setState({ home: true });
							}}
							onHideUnderlay={() => {
								this.setState({ home: false });
							}}
							onPress={() => {
								this.props.navigation.navigate("Home");
							}}
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<View
								style={{
									paddingTop: 15,
									paddingBottom: 15,

									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text
									style={
										this.state.home
											? {
													color: "#61DEFF",
													fontWeight: "bold"
											  }
											: {
													color: "#c9c9c9",
													fontWeight: "bold"
											  }
									}
								>
									Home
								</Text>
							</View>
						</TouchableHighlight>
					</View>
					<View
						style={{
							width: "70%",
							borderBottomWidth: StyleSheet.hairlineWidth,
							borderBottomColor: "#fff",
							alignSelf: "center"
						}}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onShowUnderlay={() => {
								this.setState({ book: true });
							}}
							onHideUnderlay={() => {
								this.setState({ book: false });
							}}
							onPress={() => {
								Linking.openURL(
									`https://mercedeshairdressing.com.au/app/frontend/web/index.php?firstname=${this.state.name.split(
										" "
									)[0] || "First Name"}&lastname=${this.state.name.split(
										" "
									)[1] || "Last Name"}&email=${this.state.email ||
										"email@email.com"}&phone=${this.state.phoneNumber || "0"}`
								);
							}}
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<View
								style={{
									paddingTop: 15,
									paddingBottom: 15,

									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text
									style={
										this.state.book
											? {
													color: "#61DEFF",
													fontWeight: "bold"
											  }
											: {
													color: "#c9c9c9",
													fontWeight: "bold"
											  }
									}
								>
									Book Now
								</Text>
							</View>
						</TouchableHighlight>
					</View>
					<View
						style={{
							width: "70%",
							borderBottomWidth: StyleSheet.hairlineWidth,
							borderBottomColor: "#fff",
							alignSelf: "center"
						}}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onShowUnderlay={() => {
								this.setState({ notice: true });
							}}
							onHideUnderlay={() => {
								this.setState({ notice: false });
							}}
							onPress={() => {
								this.setState({ notificationCount: 0 });
								this.props.navigation.navigate("Notice");
							}}
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<View
								style={{
									paddingTop: 15,
									paddingBottom: 15,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text
									style={
										this.state.notice
											? {
													color: "#61DEFF",
													fontWeight: "bold"
											  }
											: {
													color: "#c9c9c9",
													fontWeight: "bold"
											  }
									}
								>
									Notice
								</Text>
								{this.state.notificationCount > 0 && (
									<View
										style={{
											borderRadius: 100,
											backgroundColor: "#61DEFF",
											width: 10,
											height: 10,
											marginLeft: 5
										}}
									></View>
								)}
							</View>
						</TouchableHighlight>
					</View>
					<View
						style={{
							width: "70%",
							borderBottomWidth: StyleSheet.hairlineWidth,
							borderBottomColor: "#fff",
							alignSelf: "center"
						}}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onShowUnderlay={() => {
								this.setState({ log: true });
							}}
							onHideUnderlay={() => {
								this.setState({ log: false });
							}}
							onPress={() => {
								this.props.navigation.navigate("Log");
							}}
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<View
								style={{
									paddingTop: 15,
									paddingBottom: 15,

									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text
									style={
										this.state.log
											? {
													color: "#61DEFF",
													fontWeight: "bold"
											  }
											: {
													color: "#c9c9c9",
													fontWeight: "bold"
											  }
									}
								>
									Visit Logs
								</Text>
							</View>
						</TouchableHighlight>
					</View>
					<View
						style={{
							width: "70%",
							borderBottomWidth: StyleSheet.hairlineWidth,
							borderBottomColor: "#fff",
							alignSelf: "center"
						}}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onShowUnderlay={() => {
								this.setState({ about: true });
							}}
							onHideUnderlay={() => {
								this.setState({ about: false });
							}}
							onPress={() => {
								this.props.navigation.navigate("About");
							}}
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<View
								style={{
									paddingTop: 15,
									paddingBottom: 15,

									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text
									style={
										this.state.about
											? {
													color: "#61DEFF",
													fontWeight: "bold"
											  }
											: {
													color: "#c9c9c9",
													fontWeight: "bold"
											  }
									}
								>
									About Us
								</Text>
							</View>
						</TouchableHighlight>
					</View>
					<View
						style={{
							width: "70%",
							borderBottomWidth: StyleSheet.hairlineWidth,
							borderBottomColor: "#fff",
							alignSelf: "center"
						}}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onShowUnderlay={() => {
								this.setState({ contact: true });
							}}
							onHideUnderlay={() => {
								this.setState({ contact: false });
							}}
							onPress={() => {
								this.props.navigation.navigate("Contact Us");
							}}
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<View
								style={{
									paddingTop: 15,
									paddingBottom: 15,

									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text
									style={
										this.state.contact
											? {
													color: "#61DEFF",
													fontWeight: "bold"
											  }
											: {
													color: "#c9c9c9",
													fontWeight: "bold"
											  }
									}
								>
									Contact
								</Text>
							</View>
						</TouchableHighlight>
					</View>
					<View
						style={{
							width: "70%",
							borderBottomWidth: StyleSheet.hairlineWidth,
							borderBottomColor: "#fff",
							alignSelf: "center"
						}}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onShowUnderlay={() => {
								this.setState({ settings: true });
							}}
							onHideUnderlay={() => {
								this.setState({ settings: false });
							}}
							onPress={() => {
								this.props.navigation.navigate("Settings");
							}}
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<View
								style={{
									paddingTop: 15,
									paddingBottom: 15,

									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text
									style={
										this.state.settings
											? {
													color: "#61DEFF",
													fontWeight: "bold"
											  }
											: {
													color: "#c9c9c9",
													fontWeight: "bold"
											  }
									}
								>
									Settings
								</Text>
							</View>
						</TouchableHighlight>
					</View>
					<View
						style={{
							width: "70%",
							borderBottomWidth: StyleSheet.hairlineWidth,
							borderBottomColor: "#fff",
							alignSelf: "center",
							marginBottom: 20
						}}
					>
						<TouchableHighlight
							underlayColor="transparent"
							onShowUnderlay={() => {
								this.setState({ logout: true });
							}}
							onHideUnderlay={() => {
								this.setState({ logout: false });
							}}
							onPress={async () => {
								await AsyncStorage.removeItem("token");
								this.props.navigation.navigate("Login");
							}}
							style={{ alignItems: "center", justifyContent: "center" }}
						>
							<View
								style={{
									paddingTop: 15,
									paddingBottom: 15,

									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text
									style={
										this.state.logout
											? {
													color: "#61DEFF",
													fontWeight: "bold"
											  }
											: {
													color: "#c9c9c9",
													fontWeight: "bold"
											  }
									}
								>
									Logout
								</Text>
							</View>
						</TouchableHighlight>
					</View>
				</SafeAreaView>
			</ScrollView>
		);
	}
}

export default CustomDrawerContentComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	text: {
		color: "#fff",
		marginTop: 15,
		fontSize: 15,
		textAlign: "center",
		fontStyle: "italic"
	}
});
