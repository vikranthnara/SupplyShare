import React, { useState, useEffect } from 'react';
import { View, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to upload images.');
        }
      }
    })();
  }, []);

  const handleImageUpload = async () => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (!result.cancelled) {
        const selectedAssets = result.assets || [result];
        const newSelectedImages = [
          ...selectedImages,
          ...selectedAssets.map((asset) => asset.uri),
        ];
        setSelectedImages(newSelectedImages.slice(-10));
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  return (
    <View>
      {selectedImages.map((uri) => (
        <Image key={uri} source={{ uri }} style={{ width: 200, height: 200, marginBottom: 10 }} />
      ))}
      <Button title="Upload Images" onPress={handleImageUpload} />
    </View>
  );
};

export default ImageUploader;
