import React  from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  StatusBar, 
  Text, 
  TouchableWithoutFeedback 
} from 'react-native';

const OverlayExample = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableWithoutFeedback>
          <Text style={styles.txtSize}>
            Show me the map!
          </Text>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  text: {
    flex: 1,
   alignItems: 'center',
    justifyContent: 'center',
  },
  txtSize: {
    fontSize: 20,
  },
});

export default OverlayExample;