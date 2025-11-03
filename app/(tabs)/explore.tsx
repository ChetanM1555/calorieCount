import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, Button, View, Text } from 'react-native';
import axios from 'axios';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import CalorieSearch from '@/components/calarieSearch';

export default function TabTwoScreen() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const searchCalories = async () => {
    if (!food) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${food}`,
        {
          headers: { 'X-Api-Key': 'YOUR_API_KEY' },
        }
      );

      if (response.data.items && response.data.items.length > 0) {
        setCalories(response.data.items[0].calories);
      } else {
        setCalories(0); // Set 0 for "not found"
      }
    } catch (error) {
      console.error(error);
      setCalories(0); // Use 0 for error
    }
    setLoading(false);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Calorie Counter
        </ThemedText>
      </ThemedView>
      <ThemedText>Enter a food item here:</ThemedText>

      {/* --- Calorie Search Section --- */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter food item"
          value={food}
          onChangeText={setFood}
          placeholderTextColor="#888" // optional: makes placeholder match theme if needed
        />
        <Button title="Search Calories" onPress={searchCalories} />
        {loading && <ThemedText>Loading...</ThemedText>}
        {calories !== null && !loading && (
          <ThemedText style={styles.result}>
            {calories > 0 ? `Calories: ${calories}` : 'Item not found or error'}
          </ThemedText>
        )}
      </View>


      <ThemedView style={{ flex: 1, padding: 20 }}>
      <CalorieSearch />
      {/* other content */}
    </ThemedView>

      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  searchContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
