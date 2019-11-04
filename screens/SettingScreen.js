import React from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { TouchableHighlight } from "react-native-gesture-handler";
import axios from "axios";

export default class SettingScreen extends React.Component {
	state = {
		api: this.props.screenProps.api,
		dialogVisible: false,
		delete: false
	};

	componentDidMount() {
		this.retrieveData();
		console.log(this.props.screenProps.api);
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

	render() {
		return (
			<View style={styles.container}>
				<ConfirmDialog
					title="Delete Account"
					message="Are you sure ?"
					visible={this.state.dialogVisible}
					onTouchOutside={() => this.setState({ dialogVisible: false })}
					positiveButton={{
						title: "YES",
						onPress: async () => {
							let response = await axios({
								method: "post",
								url: this.state.api + "/users/delete",
								headers: {
									Authorization: "Bearer " + this.state.token
								}
							});
							console.log(response.data);
							if (response.data.success) {
								await AsyncStorage.removeItem("token");
								this.props.navigation.navigate("Login");
							}
						}
					}}
					negativeButton={{
						title: "NO",
						onPress: () => this.setState({ dialogVisible: false })
					}}
				/>
				<View
					style={{
						alignSelf: "stretch",
						paddingVertical: 20,
						borderBottomColor: "white",
						borderBottomWidth: StyleSheet.hairlineWidth
					}}
				>
					<TouchableHighlight
						underlayColor="transparent"
						onShowUnderlay={() => {
							this.setState({ delete: true });
						}}
						onHideUnderlay={() => {
							this.setState({ delete: false });
						}}
						onPress={() => {
							this.setState({ dialogVisible: true });
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center"
							}}
						>
							<Image
								style={{
									tintColor: this.state.delete ? "#61DEFF" : "red",
									width: 20,
									height: 20,
									marginHorizontal: 15
								}}
								source={require("../assets/images/delete.png")}
							></Image>
							<Text
								style={{
									color: this.state.delete ? "#61DEFF" : "red"
								}}
							>
								Delete Account
							</Text>
						</View>
					</TouchableHighlight>
				</View>
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
		color: "#fff"
	},
	logo: {
		height: 150,
		width: 240
	}
});
