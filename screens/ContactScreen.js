import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

import { Linking } from "expo";
import Layout from "../constants/Layout";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class ContactScreen extends React.Component {
	state = {
		phone: false,
		email: false
	};

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Image
						style={styles.image}
						source={require("../assets/images/contactimage.jpg")}
					></Image>
				</View>
				<View
					style={{
						alignSelf: "stretch",
						flexDirection: "row",
						justifyContent: "center",
						marginTop: 30
					}}
				>
					<TouchableHighlight
						underlayColor="transparent"
						onShowUnderlay={() => {
							this.setState({ phone: true });
						}}
						onHideUnderlay={() => {
							this.setState({ phone: false });
						}}
						onPress={() => {
							console.log(Layout);
							let phoneNumber = "";
							if (Platform.OS === "android") {
								phoneNumber = "tel:0420307744";
							} else {
								phoneNumber = "telprompt:${0420307744}";
							}

							Linking.openURL(phoneNumber);
						}}
					>
						<View
							style={[
								styles.button,
								this.state.phone && styles.pressedContainer,
								{ paddingHorizontal: 37 }
							]}
						>
							<Image
								style={[
									styles.buttonImage,
									this.state.phone && styles.pressedImage
								]}
								source={require("../assets/images/call.png")}
							></Image>
							<Text
								style={[styles.text, this.state.phone && styles.pressedText]}
							>
								Call Now
							</Text>
						</View>
					</TouchableHighlight>

					<TouchableHighlight
						underlayColor="transparent"
						onShowUnderlay={() => {
							this.setState({ email: true });
						}}
						onHideUnderlay={() => {
							this.setState({ email: false });
						}}
						onPress={() => {
							console.log(Layout);
							Linking.openURL("mailto:Hello@mercedeshairdressing.com");
						}}
					>
						<View
							style={[
								styles.button,
								this.state.email && styles.pressedContainer
							]}
						>
							<Image
								style={[
									styles.buttonImage,
									this.state.email && styles.pressedImage
								]}
								source={require("../assets/images/email.png")}
							></Image>
							<Text
								style={[styles.text, this.state.email && styles.pressedText]}
							>
								Email Now
							</Text>
						</View>
					</TouchableHighlight>
				</View>
				<Text
					style={[styles.text, { marginTop: 20, textTransform: "uppercase" }]}
				>
					Online Booking Only For W-Staff Bella Vista
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-start",
		alignItems: "center",
		flex: 1,
		backgroundColor: "#000"
	},
	text: {
		color: "#fff",
		fontSize: 12
	},
	button: {
		borderColor: "#fff",
		borderWidth: 1,
		borderRadius: 100,
		padding: 33,
		alignItems: "center",
		margin: 10
	},
	buttonImage: {
		width: 40,
		height: 40
	},
	image: {
		width: Layout.window.width,
		height: Layout.window.width * 0.7
	},
	pressedImage: {
		tintColor: "#61DEFF"
	},
	pressedText: {
		color: "#61DEFF"
	},
	pressedContainer: {
		borderColor: "#61DEFF"
	}
});
