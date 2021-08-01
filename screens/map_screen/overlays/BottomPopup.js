import { Modal, Dimensions, TouchableWithoutFeedback,
StyleSheet, View, Text } from "react-native";
import React from "react";

export default class BottomPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            height: 0,
            width: 0
        };
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={this.close}
                >
                <View style={styles.container}>
                    <View style={styles.popup}>
                        <Text style={styles.popupText}>
                            {this.props.text}
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
    }