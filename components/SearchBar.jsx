import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet, Text, Button, Modal } from "react-native";
import axios from "axios";
import cheerio from "cheerio";

const SearchBar = ({ onParsedData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [parsedData, setParsedData] = useState([]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      axios
        .get(`http://localhost:3000/search?name=${searchTerm}`)
        .then((response) => {
          const items = parseHTML(response.data);
          setParsedData(items);
          setModalVisible(true);
          onParsedData(items);
        })
        .catch((error) => {
          console.error("Error during search:", error);
        });
    }
  };

  const parseHTML = (html) => {
    const $ = cheerio.load(html);
    const items = [];

    // Perform HTML parsing using Cheerio
    $("table tbody tr").each((index, element) => {
      const name = $(element).find("td:nth-child(1)").text().trim();
      const price = $(element).find("td:nth-child(2)").text().trim();
      const uuid = $(element).find("input[name=itemId]").val();
      items.push({ Name: name, Price: price, UUID: uuid });
    });

    return items;
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title="Search" onPress={handleSearch} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {parsedData.length > 0 ? (
            parsedData.map((item) => (
              <View key={item.UUID}>
                <Text>{item.Name}</Text>
                <Text>{item.Price}</Text>
              </View>
            ))
          ) : (
            <Text>No items found.</Text>
          )}

          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
