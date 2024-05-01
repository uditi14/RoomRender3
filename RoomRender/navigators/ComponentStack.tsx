import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesPage from '../components/CategoriesPage';
import ProductCard from '../components/productCard';
import ProductInfo from '../screens/ProductInfo';
import ArScreen from '../components/ArScreen';

type RootStackParamList = {
  CategoriesPage: undefined;
  Catalog: { category: string };
  ProductInfo: { item: any }; // Adjust the type as per your item type
  ArScreen : { item: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ComponentStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="CategoriesPage">
      <Stack.Screen
        name="CategoriesPage"
        component={CategoriesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Catalog"
        component={ProductCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ArScreen'
        component={ArScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ComponentStack;