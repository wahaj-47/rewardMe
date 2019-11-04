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
	AsyncStorage,
	Vibration,
	Animated,
	Easing,
	BackHandler
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dialog } from "react-native-simple-dialogs";
import { ProgressDialog } from "react-native-simple-dialogs";
import Constants from "../constants/Layout";

class WiggleView extends React.Component {
	state = { rotation: new Animated.Value(0) };

	componentDidMount() {
		Animated.sequence([
			Animated.timing(
				// Animate over time
				this.state.rotation, // The animated value to drive
				{
					toValue: 0.25, // Animate to opacity: 1 (opaque)
					duration: 200 // Make it take a while
				}
			),
			Animated.timing(
				// Animate over time
				this.state.rotation, // The animated value to drive
				{
					toValue: 0.5, // Animate to opacity: 1 (opaque)
					duration: 200 // Make it take a while
				}
			),
			Animated.timing(
				// Animate over time
				this.state.rotation, // The animated value to drive
				{
					toValue: 0.75, // Animate to opacity: 1 (opaque)
					duration: 200 // Make it take a while
				}
			),
			Animated.timing(
				// Animate over time
				this.state.rotation, // The animated value to drive
				{
					toValue: 1, // Animate to opacity: 1 (opaque)
					duration: 200 // Make it take a while
				}
			)
		]).start(); // Starts the animation
	}

	render() {
		const { scale, rotation } = this.state;
		const spin = rotation.interpolate({
			inputRange: [0, 0.25, 0.5, 0.75, 1],
			outputRange: ["0deg", "10deg", "-10deg", "10deg", "0deg"]
		});
		return (
			<Animated.View
				style={{
					transform: [{ rotate: spin }]
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}

class ElasticView extends React.Component {
	state = { scale: new Animated.Value(0) };

	componentDidMount() {
		Animated.timing(
			// Animate over time
			this.state.scale, // The animated value to drive
			{
				toValue: 1, // Animate to opacity: 1 (opaque)
				easing: Easing.elastic(2),
				duration: 1000 // Make it take a while
			}
		).start(); // Starts the animation
	}

	render() {
		const { scale } = this.state;

		return (
			<Animated.View
				style={{
					transform: [{ scale: scale }]
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}

class HomeScreen extends React.Component {
	state = {
		isScanning: false,
		hasCameraPermission: null,
		scanned: false,
		dialogVisible: false,
		noticeVisible: false,
		revealSlot: false,
		api: this.props.screenProps.api,
		notification: this.props.screenProps.notification,
		appVersion: this.props.screenProps.appVersion
	};

	async componentDidMount() {
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			if (this.state.isScanning) {
				this.setState({
					isScanning: false,
					hasCameraPermission: null,
					scanned: false
				});
				return true;
			}
		});
		this.props.navigation.addListener("didFocus", async () => {
			this.setState({
				scanned: true,
				isScanning: false,
				hasCameraPermission: null
			});
			this.getRevealedSlots();
		});
		if (await this.retrieveData()) {
			this.getRevealedSlots();
			this.registerForPushNotificationsAsync();
		}
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.screenProps.notification !== this.props.screenProps.notification
		) {
			this.setState({
				notification: this.props.screenProps.notification,
				noticeVisible: true
			});
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
			url: this.state.api + "/deviceToken",
			headers: {
				Authorization: "Bearer " + this.state.token
			}
		});
		if (response.data.devices.length) {
			axios({
				method: "post",
				url: this.state.api + "/deviceToken/update",
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
				url: this.state.api + "/deviceToken/insert",
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
			url: this.state.api + "/slots/revealed",
			headers: {
				Authorization: "Bearer " + this.state.token
			}
		});
		if (typeof response.data.slots !== "undefined") {
			if (response.data.slots.length === 8) {
				this.setState({
					revealedSlots: response.data.slots,
					allowScan: response.data.allowScan
				});
				if (!this.state.dialogVisible) {
					setTimeout(() => {
						this.setState({ progressVisible: true });
					}, 2000);
					setTimeout(() => {
						this.resetSlots();
						this.setState({ progressVisible: false });
					}, 4000);
				}
			} else {
				this.setState({
					revealedSlots: response.data.slots,
					allowScan: response.data.allowScan
				});
			}
		}
	};

	revealSlot = async () => {
		let response = await axios.all([
			axios({
				method: "post",
				url: this.state.api + "/slots/reveal",
				headers: {
					Authorization: "Bearer " + this.state.token
				},
				data: {
					slot_id: this.state.revealedSlots.length + 1
				}
			}),
			axios({
				method: "post",
				url: this.state.api + "/logs",
				headers: { Authorization: "Bearer " + this.state.token },
				data: { slot_id: this.state.revealedSlots.length + 1 }
			})
		]);
		this.setState({ revealedSlot: response[0].data.results[1][0] });
	};

	resetSlots = () => {
		axios({
			method: "get",
			url: this.state.api + "/slots/reset",
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

	handleBarCodeScanned = async ({ type, data }) => {
		console.log(data);
		if (data === "37546961849") {
			if (this.state.scanned) return;
			this.setState({
				hasCameraPermission: null,
				scanned: true,
				isScanning: false,
				showNotice: true,
				dialogVisible: true
			});
			Vibration.vibrate(500);
			const soundObject = new Audio.Sound();
			try {
				await soundObject.loadAsync(require("../assets/sounds/qrcode.wav"));
				await soundObject.playAsync();
			} catch {
				console.log("Error loading qr audio");
			}
			this.revealSlot();
		}
	};

	createSlotGrid = () => {
		const slotRows = [];
		for (let i = 0, l = 0, k = 4; i < 2; i++) {
			let slots = [];
			for (let j = 0; j < k; j++) {
				slots.push(
					typeof this.state.revealedSlots[l] !== "undefined" ? (
						<ImageBackground
							key={l}
							source={Asset.fromModule(
								require("../assets/images/checkMark.png")
							)}
							style={styles.slot}
						></ImageBackground>
					) : (
						<ImageBackground
							key={l}
							source={Asset.fromModule(
								require("../assets/images/slotUnrevealed.png")
							)}
							style={styles.slot}
						>
							<Text style={[styles.slotValue, { color: "white" }]}>
								{l + 1}
							</Text>
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
				<ProgressDialog
					titleStyle={{ textAlign: "center" }}
					visible={this.state.progressVisible}
					title="Thank You For Your Loyalty"
					message="Resetting the slots..."
				/>
				<Dialog
					title={
						typeof this.state.notification.data !== "undefined"
							? this.state.notification.data.title
							: ""
					}
					titleStyle={[styles.noticeTitle, { fontSize: 16 }]}
					animationType="fade"
					visible={this.state.noticeVisible}
					onTouchOutside={() => {
						this.setState({
							noticeVisible: false
						});
					}}
					contentStyle={{ alignItems: "stretch" }}
				>
					{typeof this.state.notification.data !== "undefined" && (
						<View>
							<View style={{ marginBottom: 10 }}>
								<Text style={[styles.noticeTitle, { fontSize: 14 }]}>
									{this.state.notification.data.subtitle}
								</Text>
							</View>
							<View>
								<Text style={{ fontSize: 12, textAlign: "center" }}>
									{this.state.notification.data.msg}
								</Text>
							</View>
						</View>
					)}
					<View style={styles.noticeFooter}>
						<TouchableOpacity
							onPress={() => {
								this.setState({
									noticeVisible: false
								});
							}}
						>
							<Text style={styles.noticeTitle}>Close</Text>
						</TouchableOpacity>
					</View>
				</Dialog>
				<Dialog
					title=""
					animationType="fade"
					dialogStyle={{ backgroundColor: "white" }}
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
					contentStyle={{ alignItems: "stretch" }}
				>
					{!revealSlot ? (
						<View>
							<View>
								<View style={{ marginBottom: 10 }}>
									<Text style={[styles.noticeTitle, { marginBottom: 5 }]}>
										Thanks For Visiting Us
									</Text>
									<Text style={styles.noticeTitle}>
										We'd like to <Text style={{ color: "red" }}>reward</Text>{" "}
										your loyalty
									</Text>
								</View>
								<TouchableOpacity
									style={{
										alignItems: "center",
										justifyContent: "center",
										width: 150,
										height: 150,
										alignSelf: "center"
									}}
									onPress={async () => {
										const coinSound = new Audio.Sound();
										try {
											await coinSound.loadAsync(
												require("../assets/sounds/coin.wav")
											);
											await coinSound.playAsync();
										} catch {
											console.log("Error loading coin audio");
										}

										this.setState({ revealSlot: true });
									}}
								>
									<ImageBackground
										source={Asset.fromModule(
											require("../assets/images/slotUnrevealed.png")
										)}
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

							<View style={styles.noticeFooter}>
								<Text style={styles.noticeTitle}>
									Earn Surprise Cash{" "}
									<Text style={{ color: "red" }}>Discounts</Text>
								</Text>
							</View>
						</View>
					) : (
						<View>
							<View style={{ marginBottom: 10 }}>
								<WiggleView>
									<Text
										style={[
											styles.noticeTitle,
											{
												color: "red",
												fontSize: 22,
												marginBottom: 5
											}
										]}
									>
										Congrats !
									</Text>
								</WiggleView>
								<Text style={styles.noticeTitle}>You have just saved</Text>
							</View>
							{typeof this.state.revealedSlot !== "undefined" ? (
								<ElasticView>
									<ImageBackground
										source={Asset.fromModule(
											require("../assets/images/slotRevealed.png")
										)}
										style={{
											width: 150,
											height: 150,
											alignSelf: "center",
											alignItems: "center",
											justifyContent: "center"
										}}
									>
										<Text
											style={[
												styles.noticeTitle,
												{ fontSize: 30, color: "#1f1f1f" }
											]}
										>
											${this.state.revealedSlot.slot_value}
										</Text>
									</ImageBackground>
								</ElasticView>
							) : (
								<View>
									<ActivityIndicator size="large" color="#61DEFF" />
								</View>
							)}
							<View style={styles.noticeFooter}>
								<TouchableOpacity
									onPress={() => {
										this.getRevealedSlots();
										this.setState({
											dialogVisible: false,
											revealSlot: false,
											revealedSlot: undefined
										});
									}}
								>
									<Text style={styles.noticeTitle}>Close</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Dialog>
				{(isScanning && hasCameraPermission !== false) ||
				hasCameraPermission !== null ? (
					<View
						style={{
							position: "absolute",
							top: 5,
							left: 15,
							width: Constants.window.width - 30,
							height: Constants.window.height - 100,
							marginVertical: 10,
							zIndex: 1,
							overflow: "hidden"
						}}
					>
						<Camera
							barCodeSettings={{
								barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
							}}
							onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
							style={[
								{ justifyContent: "space-between" },
								StyleSheet.absoluteFillObject
							]}
						>
							<View
								style={{
									backgroundColor: "white",
									alignSelf: "stretch",
									padding: 20,
									zIndex: 1
								}}
							>
								<Text style={{ textAlign: "center" }}>
									Scan the QR code to receive surprise Discounts
								</Text>
							</View>
							<View
								style={[
									StyleSheet.absoluteFillObject,
									{
										borderColor: "rgba(0,0,0,0.5)",
										borderWidth: 50,
										borderTopWidth: 140,
										borderBottomWidth: 140,
										zIndex: 0
									}
								]}
							></View>
							<TouchableOpacity
								style={{
									backgroundColor: "white",
									alignSelf: "stretch",
									padding: 20
								}}
								onPress={() => {
									this.setState({
										isScanning: false,
										hasCameraPermission: null,
										scanned: false
									});
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 20,
										textAlign: "center"
									}}
								>
									Stop Scanning
								</Text>
							</TouchableOpacity>
						</Camera>
					</View>
				) : (
					<View style={{ marginVertical: 5 }}>
						<Image
							style={{ height: 130, width: 130 }}
							source={Asset.fromModule(require("../assets/images/qrcode.png"))}
						></Image>
					</View>
				)}
				<Text
					style={{
						marginVertical: 5,
						marginBottom: 10,
						color: "#c9c9c9",
						fontSize: 12
					}}
				>
					Receive Surprise Discounts On Each Visit
				</Text>
				<TouchableHighlight
					disabled={!this.state.allowScan}
					underlayColor="transparent"
					onShowUnderlay={() => {
						this.setState({ scanPressed: true });
					}}
					onHideUnderlay={() => {
						this.setState({ scanPressed: false });
					}}
					onPress={async () => {
						this.setState({ isScanning: true, scanned: false });
						this.getPermissionsAsync();
					}}
				>
					<View
						style={{
							backgroundColor: "#1f1f1f",
							flexDirection: "row",
							alignItems: "center",
							borderRadius: 25,
							paddingVertical: 5,
							paddingHorizontal: 20
						}}
					>
						<Image
							source={Asset.fromModule(require("../assets/images/camera.png"))}
							style={[
								{ height: 30, width: 30 },
								this.state.scanPressed && { tintColor: "#61DEFF" }
							]}
						></Image>
						<Text
							style={[
								styles.text,
								{ marginLeft: 5, fontWeight: "700" },
								this.state.scanPressed && { color: "#61DEFF" }
							]}
						>
							Scan
						</Text>
					</View>
				</TouchableHighlight>
				<View style={{ marginVertical: 10 }}>
					{typeof this.state.revealedSlots === "undefined" ? (
						<ActivityIndicator size="large" color="#61DEFF" />
					) : (
						this.createSlotGrid()
					)}
				</View>
				<Text style={{ color: "#c9c9c9", fontSize: 12 }}>
					All Slots Will Reset After Your 8th Visit
				</Text>
				<Text
					style={{
						color: "#c9c9c9",
						fontSize: 10,
						position: "absolute",
						bottom: 15,
						alignItems: "center"
					}}
				>
					v {this.state.appVersion}
				</Text>
			</View>
		);
	}
}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		padding: 10,
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
		alignItems: "center",
		marginTop: 15,
		paddingTop: 20,
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
	slotValue: { color: "#1f1f1f", fontSize: 15, fontWeight: "bold" },
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
