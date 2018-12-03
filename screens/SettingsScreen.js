import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { SectionList, Image, StyleSheet, Text, View, TextInput } from "react-native";
import { Constants } from "expo";

export default class SettingsScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        serverAddressValue: Constants.manifest.extra.serverAddress,
        serverPortValue: Constants.manifest.extra.serverPort
      }
  }


  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    let textInputStyle = {
        // width: Layout.window.width - 20,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 15,
        padding: 5,
        height: 40,
    };

    const updateServerAddress = value => this.setState({ serverAddressValue: value });
    const submitServerAddress = value => (Constants.manifest.extra.serverAddress = this.state.serverAddressValue);
    const updateServerPort = value => this.setState({ serverPortValue: value });
    const submitServerPort = value => (Constants.manifest.extra.serverPort = this.state.serverPortValue);

    return (
        <View style={{ padding: 10 }}>
            <Text>
                Server Address
            </Text>
            <TextInput
                onChangeText={updateServerAddress}
                onSubmitEditing={submitServerAddress}
                style={[{ marginBottom: 10 }, textInputStyle]}
                value={this.state.serverAddressValue}
            />

            <Text>
                Server Port
            </Text>
            <TextInput
                onChangeText={updateServerPort}
                onSubmitEditing={submitServerPort}
                style={[{ marginBottom: 10 }, textInputStyle]}
                value={this.state.serverPortValue.toString()}
            />

        </View>
    );
  }

}
