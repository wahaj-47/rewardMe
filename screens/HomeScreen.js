import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Modal
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ConfirmDialog } from "react-native-simple-dialogs";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
	state = {
		isScanning: false,
		hasCameraPermission: null,
		scanned: false,
		dialogVisible: false
	};

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === "granted" });
	};

	handleBarCodeScanned = () => {
		this.setState({
			scanned: true,
			isScanning: false,
			hasCameraPermission: null,
			showNotice: true,
			dialogVisible: true
		});
	};

	render() {
		const {
			hasCameraPermission,
			scanned,
			isScanning,
			dialogVisible
		} = this.state;
		return (
			<View style={styles.container}>
				<ConfirmDialog
					title="Notice"
					animationType="fade"
					visible={this.state.dialogVisible}
					onTouchOutside={() => this.setState({ dialogVisible: false })}
					positiveButton={{
						title: "Close",
						onPress: () => this.setState({ dialogVisible: false })
					}}
				>
					<View>
						<Text>Thanks for visiting us</Text>
					</View>
				</ConfirmDialog>
				{(isScanning && hasCameraPermission !== false) ||
				hasCameraPermission !== null ? (
					<View style={{ width: 180, height: 180, marginVertical: 10 }}>
						<BarCodeScanner
							onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
							style={StyleSheet.absoluteFillObject}
						/>
					</View>
				) : (
					<View style={{ marginVertical: 10 }}>
						<Image
							style={{ height: 180, width: 180 }}
							source={require("../assets/images/qrcode.png")}
						></Image>
					</View>
				)}
				<TouchableOpacity
					style={{
						backgroundColor: "#1f1f1f",
						flexDirection: "row",
						alignItems: "center",
						borderRadius: 25,
						paddingVertical: 5,
						paddingHorizontal: 20
					}}
					onPress={async () => {
						console.log(this.state);
						this.setState({ isScanning: true, scanned: false });
						this.getPermissionsAsync();
					}}
				>
					<Image
						source={require("../assets/images/camera.png")}
						style={{ height: 30, width: 30 }}
					></Image>
					<Text style={[styles.text, { marginLeft: 5, fontWeight: "700" }]}>
						Scan
					</Text>
				</TouchableOpacity>
				<View style={{ marginVertical: 10 }}>
					<View style={styles.row}>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
					</View>
					<View style={styles.row}>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
					</View>
					<View style={styles.row}>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
						<Image
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						></Image>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		backgroundColor: "#000"
	},

	text: {
		color: "#fff"
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 5
	},
	slot: { height: 60, width: 60, marginHorizontal: 5 },
	developmentModeText: {
		marginBottom: 20,
		color: "rgba(0,0,0,0.4)",
		fontSize: 14,
		lineHeight: 19,
		textAlign: "center"
	},
	contentContainer: {
		paddingTop: 30
	},
	welcomeContainer: {
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: "contain",
		marginTop: 3,
		marginLeft: -10
	},
	getStartedContainer: {
		alignItems: "center",
		marginHorizontal: 50
	},
	homeScreenFilename: {
		marginVertical: 7
	},
	codeHighlightText: {
		color: "rgba(96,100,109, 0.8)"
	},
	codeHighlightContainer: {
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: 3,
		paddingHorizontal: 4
	},
	getStartedText: {
		fontSize: 17,
		color: "rgba(96,100,109, 1)",
		lineHeight: 24,
		textAlign: "center"
	},
	tabBarInfoContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: "black",
				shadowOffset: { width: 0, height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3
			},
			android: {
				elevation: 20
			}
		}),
		alignItems: "center",
		backgroundColor: "#fbfbfb",
		paddingVertical: 20
	},
	tabBarInfoText: {
		fontSize: 17,
		color: "rgba(96,100,109, 1)",
		textAlign: "center"
	},
	navigationFilename: {
		marginTop: 5
	},
	helpContainer: {
		marginTop: 15,
		alignItems: "center"
	},
	helpLink: {
		paddingVertical: 15
	},
	helpLinkText: {
		fontSize: 14,
		color: "#2e78b7"
	}
});
