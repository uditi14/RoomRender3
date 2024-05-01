import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../utils/colors';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ActionsSection from '../components/ActionsSection';

const HomePage: React.FC = () => {
  return (
    <View style={homePageStyles.homePageContainer}>
      <Header />
      <Hero />
      <ActionsSection />
    </View>
  );
};

const homePageStyles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    // marginTop: '10%',
  },
});

export default HomePage;