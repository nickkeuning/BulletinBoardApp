import React from "react";
import {
  Alert,
  ScrollView,
  View,
  Platform,
  Image,
  Button,
  Text
} from "react-native";
import { ImagePicker, Permissions, Video, Constants } from "expo";
import { NavigationEvents } from "react-navigation";
import MonoText from "../components/MonoText"

export default class ImagePickerScreen extends React.Component {
  static navigationOptions = {
    title: "Submit Poll Tape"
  };
  state = {
    selection: null,
    ocrResult: null
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

    const { selection } = this.state;
    const selectionRender =
      !selection ? (selection) : (this.renderSelection(selection));

    const submitButton = 
      !selection ? (selection) : (this.renderSubmitButton());

    return (
      <ScrollView style={{ padding: 10 }}>
        <NavigationEvents onDidFocus={this.componentDidFocus} />
        <Button onPress={showCamera} title="Take Photo of Poll Tape" />
        {selectionRender}
        {submitButton}
      </ScrollView>
    );
  }

  renderSelection(selection) {
    return (
      <View style={{ marginVertical: 16 }}>
        <View
          style={{
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "#000000"
          }}
        >
          <Image
            source={{ uri: selection.uri }}
            style={{ width: 300, height: 300, resizeMode: "contain" }}
          />
        </View>
      </View>
    );
  }

  renderSubmitButton() {
    const submitImage = async () => {
      Constants.manifest.extra.ocrEndpoint = "/api/ocr";
      const { serverAddress, serverPort, ocrEndpoint } = Constants.manifest.extra;
      const requestAddress = `http://${serverAddress}:${serverPort}${ocrEndpoint}`;
      const { selection } = this.state;

      let formData = new FormData();
      let photo = {
        uri: selection.uri,
        type: "image/jpg",
        name: "image.jpg"
      }
      formData.append("image", photo);

      fetch(requestAddress, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data"
        },
        body: formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ocrResult: responseJson});
      })
      .catch((error) => {
        console.log(error);
      })
    };

    const ocrResultRender =
      !this.state.ocrResult ? (this.state.ocrResult) : (
        <MonoText>{this.state.ocrResult.output}</MonoText>
      );

    return (
      <View>
        <Button onPress={submitImage} title="Submit Poll Tape" />
        {ocrResultRender}
      </View>
    );
  }
}
