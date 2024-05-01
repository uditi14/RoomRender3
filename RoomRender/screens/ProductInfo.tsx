import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
import colors from '../utils/colors';

type RootStackParamList = {
  ProductInfo: { item: Product };
};

interface Product {
  id: number;
  title: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  price: string;
  image: any;
  link: string;
}

const ProductInfo: React.FC<{
  route: { params: { item: Product } };
  navigation: { navigate: (screen: keyof RootStackParamList, params?: any) => void };
}> = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.dimensions}>
          {item.dimensions.width} * {item.dimensions.height} * {item.dimensions.depth}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('ArScreen')}>
          <Text style={styles.buttonText}>View in my room</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => Linking.openURL(item.link)}>
          <Text style={styles.buttonText}>Proceed to Buy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.bg,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '90%',
    height: '100%',
    borderRadius: 20,
  },
  infoContainer: {
    marginHorizontal: '10%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.cream,
  },
  description: {
    fontSize: 16,
    marginBottom: 7,
    color: colors.cream,
  },
  dimensions: {
    fontSize: 16,
    marginBottom: 7,
    color: colors.cream,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 35,
    color: colors.cream,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: colors.buttongray,
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductInfo;