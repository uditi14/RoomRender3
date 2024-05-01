import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={headerStyles.headerContainer}>
      <Image
        source={require('../assets/logo.png')}
        style={headerStyles.headerLogo}
      />
    </View>
  );
};

const headerStyles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 45,
  },
  headerLogo: {
    width: 250,
    height: 65,
  },
});

export default Header;