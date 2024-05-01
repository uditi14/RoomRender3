import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import colors from '../utils/colors';

interface CardProps {
  title: string;
  illustration: any;
  backgroundColor: string;
}

const Card: React.FC<CardProps> = ({ title, illustration, backgroundColor }) => {
  return (
    <View style={[actionSectionStyles.card, { backgroundColor }]}>
      <View style={actionSectionStyles.cardContent}>
        <Image source={illustration} style={actionSectionStyles.illustration} />
        <Text style={actionSectionStyles.title}>{title}</Text>
      </View>
    </View>
  );
};

interface ActionsSectionProps {
  navigation: NavigationProp<any>;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ navigation }) => {
  return (
    <View>
      <Text style={actionSectionStyles.quickStart}>Quick Start:</Text>
      <View style={actionSectionStyles.container}>
        <Pressable
          onPress={() => {
            navigation.navigate('AR');
          }}
        >
          <Card
            title="Launch AR Camera"
            illustration={require('../assets/ARcard.png')}
            backgroundColor={colors.cream}
          />
        </Pressable>
        <Card
          title="Browse collections"
          illustration={require('../assets/BrowseCard.png')}
          backgroundColor={colors.orange}
        />
        <Card
          title="Your Favourites"
          illustration={require('../assets/FavouritesCard.png')}
          backgroundColor={colors.lilac}
        />
        <Card
          title="Contact Us"
          illustration={require('../assets/ContactUsCard.png')}
          backgroundColor={colors.blue}
        />
      </View>
    </View>
  );
};

const actionSectionStyles = StyleSheet.create({
  quickStart: {
    color: colors.cream,
    fontSize: 20,
    padding: 10,
  },
  container: {
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: 150,
    height: 160,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 3,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
    color:colors.black,
  },
  illustration: {
    width: 120,
    height: 80,
    marginBottom: 5,
    borderRadius: 8,
  },
});

export default ActionsSection;