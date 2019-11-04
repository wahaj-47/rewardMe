import React from "react";
import axios from "axios";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	AsyncStorage,
	ActivityIndicator
} from "react-native";
import { Asset } from "expo-asset";
import { FlatList } from "react-native-gesture-handler";

export default class LogScreen extends React.Component {
	state = { api: this.props.screenProps.api };

	componentDidMount() {
		this.props.navigation.addListener("didFocus", async () => {
			if (await this.retrieveData()) this.getLogs();
		});
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

	getLogs = async () => {
		let response = await axios({
			method: "get",
			url: this.state.api + "/logs",
			headers: {
				Authorization: "Bearer " + this.state.token
			}
		});
		let total = 0;
		response.data.logs.map(log => {
			total = total + log.value;
		});
		this.setState({ logs: response.data.logs, totalSaved: total });
	};

	clearLogs = async () => {
		let response = await axios({
			method: "get",
			url: this.state.api + "/logs/clear",
			headers: {
				Authorization: "Bearer " + this.state.token
			}
		});
		if (response.data.logsCleared) {
			this.getLogs();
		}
	};

	render() {
		return (
			<View style={styles.container}>
				{typeof this.state.logs === "undefined" ? (
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<ActivityIndicator style={{}} size="large" color="#61DEFF" />
					</View>
				) : (
					<View style={{ flex: 1 }}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-start",
								marginVertical: 20,
								marginRight: 10
							}}
						>
							<TouchableOpacity
								style={{
									borderColor: "white",
									borderRadius: 5,
									borderWidth: StyleSheet.hairlineWidth,
									padding: 5,
									marginLeft: 10
								}}
								onPress={this.clearLogs}
							>
								<Text style={styles.text}>Clear Logs</Text>
							</TouchableOpacity>
						</View>
						{this.state.logs.length < 1 ? (
							<View style={{ alignItems: "center" }}>
								<Text style={styles.text}>Nothing to show</Text>
							</View>
						) : (
							<FlatList
								style={{ flex: 1 }}
								data={this.state.logs}
								ItemSeparatorComponent={() => (
									<View
										style={{
											height: StyleSheet.hairlineWidth,
											backgroundColor: "white"
										}}
									/>
								)}
								renderItem={({ item }) => {
									let time = item.timestamp.split("T")[1];
									time = time.split(":");
									time = time[0] + ":" + time[1];
									return (
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												paddingVertical: 10,
												marginLeft: 10
											}}
										>
											<Image
												style={{ width: 35, height: 35, marginRight: 15 }}
												source={Asset.fromModule(
													require("../assets/images/happy.png")
												)}
											></Image>
											<Text style={styles.text}>
												You visited us on{" "}
												<Text style={styles.italic}>
													{item.timestamp.split("T")[0]}
												</Text>{" "}
												at <Text style={styles.italic}>{time}</Text>
											</Text>
										</View>
									);
								}}
								keyExtractor={item => String(item.log_id)}
							/>
						)}
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000"
	},
	text: {
		color: "#fff",
		fontSize: 14
	},
	italic: {
		color: "#61DEFF",
		fontStyle: "italic"
	}
});
