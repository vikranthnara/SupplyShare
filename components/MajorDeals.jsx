import React from 'react';
import { View, Image, Text, Button, Animated, StyleSheet} from 'react-native';
import NavigationBar from './NavigationBar';

export default function MajorDeals() {
  const deals = [
    { id: 1, title: 'Deal 1', image: require('../assets/deal1.jpg') },
    { id: 2, title: 'Deal 2', image: require('../assets/deal2.jpg') },
    { id: 3, title: 'Deal 3', image: require('../assets/deal3.jpg') },
  ];

  return (
    <View>
      {deals.map((deal) => (
        <View key={deal.id} style={{ marginVertical: 10, padding: 10 }}>
          <Image source={deal.image} style={{ width: '100%', height: 200 }} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
            {deal.title}
          </Text>
          <Button title="Buy Now" onPress={() => {}} />
        </View>
      ))}
      <NavigationBar />

    </View>
  );
}
