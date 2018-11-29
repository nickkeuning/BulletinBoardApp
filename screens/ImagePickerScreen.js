import React from 'react';
import { Alert, ScrollView, View, Platform, Image, Button, Text } from 'react-native';
import { ImagePicker, Permissions, Video, Constants } from 'expo';
import { NavigationEvents } from 'react-navigation';

export default class ImagePickerScreen extends React.Component {
  static navigationOptions = {
    title: 'Submit Poll Tape',
  };
  state = {
    selection: null,
  };

  async componentDidFocus() {
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    const showCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({});
      if (result.cancelled) {
        this.setState({ selection: null });
      } else {
        this.setState({ selection: result });
      }
    };

    //   const { serverAddress } = Constants.manifest.extra;

    return (
      <ScrollView style={{ padding: 10 }}>
        <NavigationEvents onDidFocus={this.componentDidFocus} />
        <Button onPress={showCamera} title="Take Photo of Poll Tape" />
        {this._maybeRenderSelection()}
      </ScrollView>
    );
  }

  _maybeRenderSelection = () => {
    const { selection } = this.state;

    if (!selection) {
      return;
    }

    const media =
      selection.type === 'video' ? (
        <Video
          source={{ uri: selection.uri }}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
          shouldPlay
          isLooping
        />
      ) : (
        <Image
          source={{ uri: selection.uri }}
          style={{ width: 300, height: 300, resizeMode: 'contain' }}
        />
      );

      const result = <Text>{JSON.stringify(selection, null, 2)}</Text>;

    return (
      <View style={{ marginVertical: 16 }}>
        <View
          style={{
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#000000',
          }}>
          {media}
        </View>
        {result}
      </View>
    );
  };
}
