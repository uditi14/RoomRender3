import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const Hero: React.FC = () => {
  return (
    <View style={heroStyles.heroContainer}>
      <Text style={heroStyles.heroTitle}>Welcome to RoomRender</Text>
      <Text style={heroStyles.heroInfo}>
        Elevate your decor with accuracy and precision!
      </Text>
    </View>
  );
};

const heroStyles = StyleSheet.create({
  heroContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 30,
  },
  heroTitle: {
    fontSize: 25,
    color: colors.cream,
  },
  heroInfo: {
    fontSize: 15,
    color: colors.cream,
  },
});

export default Hero;
