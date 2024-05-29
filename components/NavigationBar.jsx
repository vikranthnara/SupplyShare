import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const NavigationBar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={[styles.navigationBar, styles.fixedBottom]}>
      <TouchableOpacity onPress={() => navigateToScreen('HomeScreen')}>
        <Text style={styles.navButtonText}>Home</Text>
      </TouchableOpacity>ß
      <TouchableOpacity onPress={() => navigateToScreen('SellItemScreen')}>
        <Text style={styles.navButtonText}>Sell Item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('SignInScreen')}>
        <Text style={styles.navButtonText}>Sign In</Text>
      </TouchableOpacity>
      {/* Add additional navigation buttons as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    height: 50,
    paddingHorizontal: 10,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NavigationBar;
