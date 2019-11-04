import React from "react";
import axios from "axios";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	AsyncStorage
} from "react-native";

import { FlatList } from "react-native-gesture-handler";
import { Dialog } from "react-native-simple-dialogs";

export default class NoticeScreen extends React.Component {
	state = {
		noticeVisible: false,
		api: this.props.screenProps.api
	};

	componentDidMount() {
		this.props.navigation.addListener("didFocus", async () => {
			if (await this.retrieveData()) this.getNotices();
		});
	}

	getNotices = async () => {
		let response = await axios({
			method: "get",
			url: this.state.api + "/notice/all",
			headers: {
				Authorization: "Bearer " + this.state.token
			}
		});
		if (typeof response.data.results !== "undefined") {
			let notices = response.data.results[0].concat(response.data.results[1]);
			this.setState({ notices });
		}
	};

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

	render() {
		return (
			<View style={styles.container}>
				<Dialog
					title={
						typeof this.state.notice !== "undefined"
							? this.state.notice.title
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
					{typeof this.state.notice !== "undefined" && (
						<View>
							<View style={{ marginBottom: 10 }}>
								<Text style={[styles.noticeTitle, { fontSize: 14 }]}>
									{this.state.notice.subtitle}
								</Text>
							</View>
							<View>
								<Text style={{ fontSize: 12, textAlign: "center" }}>
									{this.state.notice.msg}
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
				{typeof this.state.notices !== "undefined" &&
				this.state.notices.length ? (
					<FlatList
						style={{ flex: 1 }}
						data={this.state.notices}
						ItemSeparatorComponent={() => (
							<View
								style={{
									height: StyleSheet.hairlineWidth,
									backgroundColor: "white"
								}}
							/>
						)}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity
									onPress={() => {
										this.setState({
											noticeVisible: true,
											notice: item
										});
									}}
								>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											paddingLeft: 5,
											paddingVertical: 10
										}}
									>
										<Image
											source={require("../assets/images/notice.png")}
										></Image>
										<Text style={styles.text}>{item.title}</Text>
									</View>
								</TouchableOpacity>
							);
						}}
						keyExtractor={item => String(item.notice_id)}
					/>
				) : (
					<View style={{ marginTop: 10 }}>
						<Text style={[styles.text, { alignSelf: "center" }]}>
							Nothing to show
						</Text>
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
		marginLeft: 10
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
	}
});
