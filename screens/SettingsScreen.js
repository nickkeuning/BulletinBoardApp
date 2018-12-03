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
                // placeholder="A single line text input"
                onChangeText={updateServerAddress}
                onSubmitEditing={submitServerAddress}
                style={[{ marginBottom: 10 }, textInputStyle]}
                value={this.state.serverAddressValue}
                // value={Constants.manifest.extra.serverAddress}
            />

            <Text>
                Server Port
            </Text>
            <TextInput
                // placeholder="A single line text input"
                onChangeText={updateServerPort}
                onSubmitEditing={submitServerPort}
                style={[{ marginBottom: 10 }, textInputStyle]}
                value={this.state.serverPortValue.toString()}
                // value={Constants.manifest.extra.serverPort.toString()}
            />

            {/* <TextInput
                placeholder="A secure text field"
                keyboardAppearance="dark"
                value={this.state.secureTextValue}
                onChangeText={updateSecureTextValue}
                secureTextEntry
                style={textInputStyle}
            /> */}
        </View>
    );
  }

    // render() {
    //     const { manifest } = Constants;
    //     const sections = [
    //         {
    //             data: [{value: manifest.extra.serverAddress,},],
    //             title: "Server Address",
    //         },
    //         {
    //             data: [{ value: manifest.extra.serverPort, },],
    //             title: "Server Port",
    //         }
    //     ];

    //     return (
    //         <SectionList
    //             style={styles.container}
    //             renderItem={this._renderItem}
    //             renderSectionHeader={this._renderSectionHeader}
    //             stickySectionHeadersEnabled={true}
    //             keyExtractor={(item, index) => index}
    //             ListHeaderComponent={ListHeader}
    //             sections={sections}
    //         />
    //     );
    // }

    // _renderSectionHeader = ({ section }) => {
    //     return <SectionHeader title={section.title} />;
    // };

    // _renderItem = ({ item }) => {
    //     if (item.type === 'color') {
    //         return (
    //             <SectionContent>
    //                 {item.value && <Color value={item.value} />}
    //             </SectionContent>
    //         );
    //     } else {
    //         return (
    //             <SectionContent>
    //                 <Text style={styles.sectionContentText}>
    //                     {item.value}
    //                 </Text>
    //             </SectionContent>
    //         );
    //     }
    // };
}


// const ListHeader = () => {
//     const { manifest } = Constants;

//     return (
//         <View style={styles.titleContainer}>
//             <View style={styles.titleIconContainer}>
//                 <AppIconPreview iconUrl={manifest.iconUrl} />
//             </View>

//             <View style={styles.titleTextContainer}>
//                 <Text style={styles.nameText} numberOfLines={1}>
//                     {manifest.name}
//                 </Text>

//                 <Text style={styles.slugText} numberOfLines={1}>
//                     {manifest.slug}
//                 </Text>

//                 <Text style={styles.descriptionText}>
//                     {manifest.description}
//                 </Text>
//             </View>
//         </View>
//     );
// };

// const SectionHeader = ({ title }) => {
//     return (
//         <View style={styles.sectionHeaderContainer}>
//             <Text style={styles.sectionHeaderText}>
//                 {title}
//             </Text>
//         </View>
//     );
// };

// const SectionContent = props => {
//     return (
//         <View style={styles.sectionContentContainer}>
//             {props.children}
//         </View>
//     );
// };

// const AppIconPreview = ({ iconUrl }) => {
//     if (!iconUrl) {
//         iconUrl =
//             'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png';
//     }

//     return (
//         <Image
//             source={{ uri: iconUrl }}
//             style={{ width: 64, height: 64 }}
//             resizeMode="cover"
//         />
//     );
// };

// const Color = ({ value }) => {
//     if (!value) {
//         return <View />;
//     } else {
//         return (
//             <View style={styles.colorContainer}>
//                 <View style={[styles.colorPreview, { backgroundColor: value }]} />
//                 <View style={styles.colorTextContainer}>
//                     <Text style={styles.sectionContentText}>
//                         {value}
//                     </Text>
//                 </View>
//             </View>
//         );
//     }
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     titleContainer: {
//         paddingHorizontal: 15,
//         paddingTop: 15,
//         paddingBottom: 15,
//         flexDirection: 'row',
//     },
//     titleIconContainer: {
//         marginRight: 15,
//         paddingTop: 2,
//     },
//     sectionHeaderContainer: {
//         backgroundColor: '#fbfbfb',
//         paddingVertical: 8,
//         paddingHorizontal: 15,
//         borderWidth: StyleSheet.hairlineWidth,
//         borderColor: '#ededed',
//     },
//     sectionHeaderText: {
//         fontSize: 14,
//     },
//     sectionContentContainer: {
//         paddingTop: 8,
//         paddingBottom: 12,
//         paddingHorizontal: 15,
//     },
//     sectionContentText: {
//         color: '#808080',
//         fontSize: 14,
//     },
//     nameText: {
//         fontWeight: '600',
//         fontSize: 18,
//     },
//     slugText: {
//         color: '#a39f9f',
//         fontSize: 14,
//         backgroundColor: 'transparent',
//     },
//     descriptionText: {
//         fontSize: 14,
//         marginTop: 6,
//         color: '#4d4d4d',
//     },
//     colorContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     colorPreview: {
//         width: 17,
//         height: 17,
//         borderRadius: 2,
//         marginRight: 6,
//         borderWidth: StyleSheet.hairlineWidth,
//         borderColor: '#ccc',
//     },
//     colorTextContainer: {
//         flex: 1,
//     },
// });
