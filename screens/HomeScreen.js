import * as WebBrowser from "expo-web-browser";
import React from "react";
import axios from "axios";

import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ImageBackground,
	ActivityIndicator,
	AsyncStorage
} from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ConfirmDialog, Dialog } from "react-native-simple-dialogs";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
	state = {
		isScanning: false,
		hasCameraPermission: null,
		scanned: false,
		dialogVisible: false,
		revealSlot: false,
		api: this.props.screenProps.api
	};

	async componentDidMount() {
		if (await this.retrieveData()) {
			this.getRevealedSlots();
			this.registerForPushNotificationsAsync();
		}
	}

	async registerForPushNotificationsAsync() {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;

		// only ask if permissions have not already been determined, because
		// iOS won't necessarily prompt the user a second time.
		if (existingStatus !== "granted") {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		// Stop here if the user did not grant permissions
		if (finalStatus !== "granted") {
			return;
		}

		// Get the token that uniquely identifies this device
		let token = await Notifications.getExpoPushTokenAsync();

		// POST the token to your backend server from where you can retrieve it to send push notifications.
		let response = await axios({
			method: "get",
			url: "http://" + this.state.api + "/deviceToken",
			headers: {
				Authorization: "Bearer " + this.state.token
			}
		});
		if (response.data.devices.length) {
			axios({
				method: "post",
				url: "http://" + this.state.api + "/deviceToken/update",
				headers: {
					Authorization: "Bearer " + this.state.token
				},
				data: {
					deviceToken: token
				}
			});
		} else {
			axios({
				method: "post",
				url: "http://" + this.state.api + "/deviceToken/insert",
				headers: {
					Authorization: "Bearer " + this.state.token
				},
				data: {
					deviceToken: token
				}
			});
		}
	}

	retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem("token");
			if (value !== null) {
				this.setState({ token: value });
				return 1;
			} else {
				return 0;
			}
		} catch (error) {
			console.log(error);
		}
	};

	getRevealedSlots = async () => {
		let response = await axios({
			method: "post",
			url: "http://" + this.state.api + "/slots/revealed",
			headers: {
				Authorization: "Bearer " + this.state.token
			}
		});
		if (response.data.slots.length === 10) {
			this.resetSlots();
		} else {
			this.setState({ revealedSlots: response.data.slots });
		}
	};

	revealSlot = async () => {
		let response = await axios.all([
			axios({
				method: "post",
				url: "http://" + this.state.api + "/slots/reveal",
				headers: {
					Authorization: "Bearer " + this.state.token
				},
				data: {
					slot_id: this.state.revealedSlots.length + 1
				}
			}),
			axios({
				method: "post",
				url: "http://" + this.state.api + "/logs",
				headers: { Authorization: "Bearer " + this.state.token },
				data: { slot_id: this.state.revealedSlots.length + 1 }
			})
		]);
		this.setState({ revealedSlot: response[0].data.results[1][0] });
	};

	resetSlots = () => {
		axios({
			method: "get",
			url: "http://" + this.state.api + "/slots/reset",
			headers: {
				Authorization: "Bearer " + this.state.token
			}
		});
		this.getRevealedSlots();
	};

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === "granted" });
	};

	handleBarCodeScanned = () => {
		this.revealSlot();

		this.setState({
			scanned: true,
			isScanning: false,
			hasCameraPermission: null,
			showNotice: true,
			dialogVisible: true
		});
	};

	createSlotGrid = () => {
		const slotRows = [];
		for (let i = 0, l = 0, k = 4; i < 3; i++) {
			if (i > 1) {
				k = 2;
			}
			let slots = [];
			for (let j = 0; j < k; j++) {
				slots.push(
					typeof this.state.revealedSlots[l] !== "undefined" ? (
						<ImageBackground
							key={l}
							source={require("../assets/images/slotRevealed.png")}
							style={styles.slot}
						>
							<Text style={styles.slotValue}>
								{this.state.revealedSlots[l].slot_value}$
							</Text>
						</ImageBackground>
					) : (
						<ImageBackground
							key={l}
							source={require("../assets/images/slotUnrevealed.png")}
							style={styles.slot}
						>
							<Text style={styles.slotValue}>{l + 1}</Text>
						</ImageBackground>
					)
				);
				l++;
			}
			slotRows.push(
				<View key={i} style={styles.row}>
					{slots}
				</View>
			);
		}
		return slotRows;
	};

	render() {
		const {
			hasCameraPermission,
			scanned,
			isScanning,
			dialogVisible,
			revealSlot
		} = this.state;
		return (
			<View style={styles.container}>
				<Dialog
					title=""
					animationType="fade"
					visible={dialogVisible}
					onTouchOutside={() => {
						if (revealSlot) {
							this.getRevealedSlots();
							this.setState({
								dialogVisible: false,
								revealSlot: false
							});
						}
					}}
					contentStyle={{ alignItems: "center" }}
					buttons={
						!revealSlot ? (
							<View style={styles.noticeFooter}>
								<Text style={styles.noticeTitle}>
									Earn Surprise Cash{" "}
									<Text style={{ color: "#61DEFF" }}>Discounts</Text>
								</Text>
							</View>
						) : (
							<TouchableOpacity
								onPress={() => {
									this.getRevealedSlots();
									this.setState({
										dialogVisible: false,
										revealSlot: false
									});
								}}
								style={styles.noticeFooter}
							>
								<Text style={styles.noticeTitle}>Close</Text>
							</TouchableOpacity>
						)
					}
				>
					{!revealSlot ? (
						<View>
							<View style={{ marginBottom: 10 }}>
								<Text style={[styles.noticeTitle, { marginBottom: 5 }]}>
									Thanks For Visiting Us
								</Text>
								<Text style={styles.noticeTitle}>
									We'd like to <Text style={{ color: "red" }}>reward</Text> your
									loyalty
								</Text>
							</View>
							<TouchableOpacity
								onPress={() => this.setState({ revealSlot: true })}
							>
								<ImageBackground
									source={require("../assets/images/slotUnrevealed.png")}
									style={{
										width: 150,
										height: 150,
										alignSelf: "center",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Text style={[styles.noticeTitle, { color: "#61DEFF" }]}>
										Scratch Me
									</Text>
								</ImageBackground>
							</TouchableOpacity>
						</View>
					) : (
						<View>
							<View style={{ marginBottom: 10 }}>
								<Text
									style={[
										styles.noticeTitle,
										{ color: "red", fontSize: 22, marginBottom: 5 }
									]}
								>
									Congrats !
								</Text>
								<Text style={styles.noticeTitle}>You have just saved</Text>
							</View>
							<ImageBackground
								source={require("../assets/images/slotRevealed.png")}
								style={{
									width: 150,
									height: 150,
									alignSelf: "center",
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<Text style={[styles.noticeTitle, { fontSize: 30 }]}>
									{this.state.revealedSlot.slot_value}$
								</Text>
							</ImageBackground>
						</View>
					)}
				</Dialog>
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
					{typeof this.state.revealedSlots === "undefined" ? (
						<ActivityIndicator size="large" color="#61DEFF" />
					) : (
						this.createSlotGrid()
					)}
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
	noticeTitle: {
		textTransform: "uppercase",
		fontWeight: "bold",
		fontSize: 15,
		textAlign: "center"
	},
	noticeFooter: {
		paddingVertical: 15,
		borderTopColor: "#1f1f1f",
		borderTopWidth: StyleSheet.hairlineWidth
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
	slot: {
		height: 60,
		width: 60,
		marginHorizontal: 5,
		alignItems: "center",
		justifyContent: "center"
	},
	slotValue: { color: "#fff", fontSize: 15, fontWeight: "bold" },
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
