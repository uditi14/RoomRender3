import React from "react";
import { View, Text, StyleSheet } from "react-native";

const List: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>List Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default List;