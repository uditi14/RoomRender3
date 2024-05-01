import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AllData from '../utils/Data';
import colors from '../utils/colors';

interface Product {
  id: number;
  title: string;
  price: string;
  image: any; // Change to appropriate type for images
}

interface ProductCardProps {
  route: {
    params: {
      category: string;
    };
  };
  navigation: NavigationProp<any>;
}

const ProductCard: React.FC<ProductCardProps> = ({ route, navigation }) => {
  const category = route.params.category;
  const formattedCategory = category.replace(/\s+/g, '').toLowerCase();
  const DataToDisplay: Product[] = AllData[formattedCategory];

  const RenderItem: React.FC<{ item: Product }> = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('ProductInfo', { item })}
      style={styles.card}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      {DataToDisplay.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    width: '90%',
    height: 150,
    marginTop: 18,
    marginLeft: 18,
  },
  image: {
    width: '50%',
    height: '90%',
    marginRight: 20,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
  },
  title: {
    color: colors.cream,
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: colors.buttongray,
  },
});

export default ProductCard;
