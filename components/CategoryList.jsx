import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";

const CategoryList = () => {
  const data = [
    { id: "1", name: "Category 1", image: require("../assets/deal1.jpg") },
    { id: "2", name: "Category 2", image: require("../assets/deal2.jpg") },
    { id: "3", name: "Category 3", image: require("../assets/deal3.jpg") },
    // Add more category data as needed
  ];

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {data.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  categoryContainer: {
    marginRight: 10,
  },
  categoryImage: {
    width: 400,
    height: 400,
    borderRadius: 5,
  },
  categoryText: {
    marginTop: 5,
  },
});

export default CategoryList;
