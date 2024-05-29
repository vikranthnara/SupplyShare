import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

const RecentlyViewed = () => {
  const data = [
    { id: '1', name: 'Item 1', image: require('../assets/item1.jpg') },
    { id: '2', name: 'Item 2', image: require('../assets/item2.jpg') },
    { id: '3', name: 'Item 3', image: require('../assets/item3.jpg') },
    // Add more recently viewed data as needed
  ];

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <Text style={styles.title}>Recently Viewed</Text>
        {data.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemContainer: {
    marginRight: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  itemText: {
    marginTop: 5,
  },
});

export default RecentlyViewed;