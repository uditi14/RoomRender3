import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import colors from '../utils/colors';

interface Category {
  id: number;
  name: string;
  img: any; // Change to appropriate type for images
}

interface CategoriesPageProps {
  navigation: NavigationProp<any>; // Change to appropriate type for navigation
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ navigation }) => {
  const categories: Category[] = [
    { id: 1, name: 'Living Room', img: require('../assets/living_room.JPG') },
    { id: 2, name: 'Bedroom', img: require('../assets/bedroom.JPG') },
    { id: 3, name: 'Dining', img: require('../assets/dining.JPG') },
    { id: 4, name: 'Decor', img: require('../assets/decor.JPG') },
    { id: 5, name: 'Office', img: require('../assets/office.JPG') },
    { id: 6, name: 'Appliance', img: require('../assets/appliance.JPG') },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ marginTop: 30 }}
      />
      <Text style={styles.heading}>Categories</Text>
      <View>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate('Catalog', {
                  category: item.name.toLowerCase(),
                });
              }}
              style={styles.categoryItem}
            >
              <Image source={item.img} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </Pressable>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnStyle}
          scrollEnabled
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.bg,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    color: colors.cream,
  },
  categoryItem: {
    width: '46%',
    backgroundColor: colors.cream,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    marginBottom: 8,
    color: colors.bg
  },
  categoryImage: {
    width: '98%',
    height: 150,
    marginBottom: 5,
    borderRadius: 13,
    marginTop: 10,
  },
  columnStyle: {
    justifyContent: 'space-around',
  },
});

export default CategoriesPage;