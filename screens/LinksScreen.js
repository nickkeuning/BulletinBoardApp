import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View} from "react-native";

import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";
import Touchable from "react-native-platform-touchable";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

    render() {
        return (
            <View>
                <Text style={styles.optionsTitleText}>
                    Resources
        </Text>

                <Touchable
                    style={styles.option}
                    background={Touchable.Ripple('#ccc', false)}
                    onPress={this._handlePressDocs}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>
                                Read about the crypto behind this app
                            </Text>
                        </View>
                    </View>
                </Touchable>

                <Touchable
                    background={Touchable.Ripple('#ccc', false)}
                    style={styles.option}
                    onPress={this._handlePressSlack}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>
                                Check out the EECS 498 class page
                            </Text>
                        </View>
                    </View>
                </Touchable>

                <Touchable
                    style={styles.option}
                    background={Touchable.Ripple('#ccc', false)}
                    onPress={this._handlePressForums}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>
                                Explore the work of J. Alex Halderman
                            </Text>
                        </View>
                    </View>
                </Touchable>
            </View>
        );
    }

    _handlePressSlack = () => {
        WebBrowser.openBrowserAsync("https://www.eecs.umich.edu/courses/eecs498.009/");
    };

    _handlePressDocs = () => {
        WebBrowser.openBrowserAsync("http://epubs.surrey.ac.uk/107392/5/append-only.pdf");
    };

    _handlePressForums = () => {
        WebBrowser.openBrowserAsync("https://jhalderm.com/");
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
    },
    optionsTitleText: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 9,
        marginBottom: 12,
    },
    optionIconContainer: {
        marginRight: 9,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
    },
    optionText: {
        fontSize: 15,
        marginTop: 1,
    },
});
