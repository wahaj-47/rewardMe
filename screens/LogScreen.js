import * as WebBrowser from "expo-web-browser";
import React from "react";
import axios from "axios";
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	AsyncStorage,
	ActivityIndicator
} from "react-native";

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
								justifyContent: "flex-end",
								marginVertical: 20,
								marginRight: 10
							}}
						>
							<Text style={styles.text}>
								Total Amount Saved:{" "}
								<Text style={{ fontWeight: "800" }}>
									{this.state.totalSaved}$
								</Text>
							</Text>
						</View>
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
							renderItem={({ item }) => (
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										paddingLeft: 5,
										paddingVertical: 10,
										justifyContent: "space-between"
									}}
								>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Image
											style={{ width: 50, height: 50, marginRight: 10 }}
											source={require("../assets/images/happy.png")}
										></Image>
										<Text style={styles.text}>You Saved {item.value}$</Text>
									</View>
									<View style={{ marginRight: 10 }}>
										<Text style={styles.date}>Date: {item.timestamp}</Text>
									</View>
								</View>
							)}
							keyExtractor={item => String(item.log_id)}
						/>
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
	date: {
		color: "#fff",
		fontSize: 10
	}
});
