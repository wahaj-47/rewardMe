import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class AboutScreen extends React.Component {
	state = {
		privacyPolicy: false,
		website: false
	};

	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.logo}
					source={require("../assets/images/Logo/logo.png")}
				></Image>
				<View style={{ marginTop: 20, paddingHorizontal: 18 }}>
					<Text style={styles.text}>
						Experience a world of luxury service with Mercedes Hairdressing. A
						unique service based out of Bella Vista, Sydney. We are a reputed
						and well established hair salon that caters to a niche up market,
						who look only for the best.
					</Text>
					<Text style={[styles.text, { marginTop: 5 }]}>
						A professional hairdressing team with over 26 years of expertise, we
						are passionate about hair, fashion, and current trends around the
						world. Using the latest designs, techniques and equipment, we will
						work alongside you to bring out the style that reflects your
						distinct personality.
					</Text>
				</View>
				<View style={{ position: "absolute", bottom: 25 }}>
					<TouchableHighlight
						underlayColor="transparent"
						onShowUnderlay={() => {
							this.setState({ privacyPolicy: true });
						}}
						onHideUnderlay={() => {
							this.setState({ privacyPolicy: false });
						}}
						onPress={() => {
							this.props.navigation.navigate("Privacy Policy");
						}}
					>
						<Text
							style={{ color: this.state.privacyPolicy ? "#61DEFF" : "white" }}
						>
							Privacy Policy
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		backgroundColor: "#000"
	},
	text: {
		color: "#fff",
		textAlign: "center",
		fontFamily: "footlight",
		lineHeight: 18,
		fontSize: 15,
		letterSpacing: 1
	},
	logo: {
		height: 120,
		width: 192,
		marginTop: 20
	}
});
