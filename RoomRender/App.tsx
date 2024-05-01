import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import ComponentStack from './navigators/ComponentStack';
import RootNavigator from './navigators/RootNavigator';

export default function App() {
  return (
    // <NavigationContainer>
    //   <RootNavigator />
    // </NavigationContainer>
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
}