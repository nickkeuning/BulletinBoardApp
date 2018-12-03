import React from "react";
import {
  Alert,
  ScrollView,
  View,
  Platform,
  Image,
  Button,
  Text,
  StyleSheet
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
    ocrResult: null,
    postVerifiedResult: null
  };

  async componentDidFocus() {
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    const cameraRender = this.renderCamera();

    const { selection } = this.state;
    const selectionRender =
      !selection ? (null) : (this.renderSelection());

    const submitButton = 
      !selection ? (null) : (this.renderSubmitButton());

    const { ocrResult } = this.state;
    const ocrResultRender =
      !ocrResult ? (null) : (<MonoText>{JSON.stringify(ocrResult.output)}</MonoText>);

    const postResultButton =
      !ocrResult ? (null) : (this.renderPostResultButton());

    const { postVerifiedResult } = this.state;
    const postVerifiedResultRender =
      !postVerifiedResult ? (null) : (<MonoText>{postVerifiedResult}</MonoText>)

    return (
      <View style={styles.main}>
        <ScrollView>
          <NavigationEvents onDidFocus={this.componentDidFocus} />
          {cameraRender}
          {selectionRender}
          {submitButton}
          {ocrResultRender}
          {postResultButton}
          {postVerifiedResultRender}
        </ScrollView>
      </View>
    );
  }

  renderCamera() {
    const showCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({});
      if (result.cancelled) {
        this.setState({ selection: null });
      } else {
        this.setState({ selection: result });
      }
    };

    return(
      <Button onPress={showCamera} title="Take Photo of Poll Tape" />
    );
  }

  renderSelection() {

    const { selection } = this.state;

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
        Alert.alert(
          'Network Request Failed',
          'Please verify that the Server Address and Port, found in the Settings tab, are correct and that the backend server is running.',
          [
            {text: 'OK', onPress: () => console.log('Pressed OK')}
          ],
          { cancelable: false}
        )
      })
    };

    return (
      <View>
        <Button onPress={submitImage} title="Process Image" />
      </View>
    );
  }

  renderPostResultButton() {
    const submitPollTape = async () => {
      const { serverAddress, serverPort, verifiedEndpoint } = Constants.manifest.extra;
      const requestAddress = `http://${serverAddress}:${serverPort}${verifiedEndpoint}`;
      const { ocrResult } = this.state;

      const body = JSON.stringify({"message": ocrResult.output});
      console.log(body);

      fetch(requestAddress, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body
      })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ postVerifiedResult: responseJson });
      })
      .catch(error => {
        console.log(error);
      });
    };

    return (
      <View>
          <Button onPress={submitPollTape} title="Post Poll Tape" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1
  }
});
