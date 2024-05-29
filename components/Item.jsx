import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import axios from "axios";

const Item = (itemName) => {
  const [itemDetails, setItemDetails] = useState(null);
  const name = itemName.itemName;
  useEffect(() => {
    // Fetch item details when the component mounts
    fetchItemDetails(itemName);
  }, []);

  const fetchItemDetails = (itemName) => {
    axios
      .get(`http://localhost:3000/search?name=${name}`)
      .then((response) => {
        const itemDetails = response.data;
        // console.log(itemDetails);
        setItemDetails(itemDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      {itemDetails ? (
        <>
          <View style={styles.header}>
            {/* Display the seller's information */}
            <Text style={styles.seller}>{itemDetails.seller}</Text>
          </View>
          <Image
            source={{ uri: itemDetails.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.footer}>
            {/* Display the item's name and price */}
            <Text style={styles.itemName}>{itemDetails.name}</Text>
            <Text style={styles.price}>${itemDetails.price}</Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  seller: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "green",
  },
});

export default Item;
