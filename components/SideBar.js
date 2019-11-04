import React from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	Image,
	Text,
	AsyncStorage
} from "react-native";
import { Linking } from "expo";

import SafeAreaView from "react-native-safe-area-view";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Asset } from "expo-asset";

class CustomDrawerContentComponent extends React.Component {
	state = { name: "" };

	async componentDidMount() {
		try {
			const value = await AsyncStorage.getItem("name");
			if (value !== null) {
				this.setState({ name: value });
			} else {
				return 0;
			}
		} catch (error) {
			console.log(error);
		}
		console.log(this.state.name);
	}

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
								Linking.openURL("http://mercedeshairdressing.com.au");
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
								this.props.navigation.navigate("Notice");
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
