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
    image: null,
    ocrResult: null,
    postVerifiedResult: null,
    processingOCR: false
  };

  async componentDidFocus() {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  render() {
    const cameraRender = this.renderCamera();

    const { image } = this.state;
    const imageRender = !image ? null : this.renderImage();

    const { processingOCR } = this.state;
    const procOcrRender = !processingOCR ? (null) : (<Text>Loading, please wait...</Text>);

    const { ocrResult } = this.state;
    const ocrResultRender =
      !ocrResult ? (null) : (<MonoText>{JSON.stringify(ocrResult.output)}</MonoText>);

    const confirmButtons =
      !ocrResult ? (null) : (this.renderConfirmButtons());

    const { postVerifiedResult } = this.state;
    const postVerifiedResultRender =
      !postVerifiedResult ? (null) : (<MonoText>{postVerifiedResult}</MonoText>)

    return (
      <View style={styles.main}>
        <ScrollView>
          <NavigationEvents onDidFocus={this.componentDidFocus} />
          {cameraRender}
          {imageRender}
          {procOcrRender}
          {ocrResultRender}
          {confirmButtons}
          {postVerifiedResultRender}
        </ScrollView>
      </View>
    );
  }

  OCRImage() {
    const { serverAddress, serverPort, ocrEndpoint } = Constants.manifest.extra;
    const requestAddress = `http://${serverAddress}:${serverPort}${ocrEndpoint}`;
    const { image } = this.state;

    let formData = new FormData();
    let photo = { uri: image.uri, type: "image/jpg", name: "image.jpg" };
    formData.append("image", photo);

    this.setState(
      {
        processingOCR: true,
        ocrResult: null,
        postVerifiedResult: null
      });
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
      this.setState({
                      ocrResult: responseJson,
                      processingOCR: false 
                    });
    })
    .catch((error) => {
      Alert.alert(
        'Network Request Failed',
        'Please verify that the Server Address and Port, found in the Settings tab, are correct and that the backend server is running.',
        [
          { text: 'OK', onPress: () => console.log('Pressed OK') }
        ],
        { cancelable: false }
      )
    }) 
  }

  renderCamera() {
    const showCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({});
      if (result.cancelled) {
        this.setState({ image: null });
      } else {
        this.setState({ image: result });
        this.OCRImage();
      }
    };

    return(
      <Button onPress={showCamera} title="Take Photo of Poll Tape" />
    );
  }

  renderImage() {

    const { image } = this.state;

    return <View style={{ marginVertical: 16 }}>
        <View style={{ marginBottom: 10, alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "#000000" }}>
          <Image source={{ uri: image.uri }} style={{ width: 300, height: 300, resizeMode: "contain" }} />
        </View>
      </View>;
  }


  renderConfirmButtons() {
    const submitPollTape = async () => {
      const { serverAddress, serverPort, verifiedEndpoint } = Constants.manifest.extra;
      const requestAddress = `http://${serverAddress}:${serverPort}${verifiedEndpoint}`;
      const { ocrResult } = this.state;

      const body = JSON.stringify({ "message": ocrResult.output });

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
          this.setState(
            {
              image: null,
              ocrResult: null,
              postVerifiedResult: responseJson
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    };

    const rejectPollTape = async => {
      this.setState(
        {
          image: null,
          ocrResult: null
        }
      )
    }

    return (
      <View>
        <View>
          <MonoText>Does the information presented above match the poll tape?</MonoText>
        </View>
        <View style={{ padding: 10, flexDirection: 'row', flex: 1, width: '100%' }}>
          <View style={styles.confirmButton}>
            <Button onPress={rejectPollTape} title="No" color={"red"} />
          </View>
          <View style={styles.confirmButton}>
            <Button onPress={submitPollTape} title="Yes" color={"green"} />
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
    width: '100%'
  },
  confirmButton: {
    width: '50%',
    padding: 10
  }
});
