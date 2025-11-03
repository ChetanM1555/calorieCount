// components/CalorieSearch.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text'; // your themed text component
import axios from 'axios';

export default function CalorieSearch() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const searchCalories = async () => {
    if (!food) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${food}`,
        { headers: { 'X-Api-Key': 'YOUR_API_KEY' } }
      );
      if (response.data.items && response.data.items.length > 0) {
        setCalories(response.data.items[0].calories);
      } else {
        setCalories(0);
      }
    } catch (error) {
      console.error(error);
      setCalories(0);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter food item"
        value={food}
        onChangeText={setFood}
      />
      <Button title="Search Calories" onPress={searchCalories} />
      {loading && <ThemedText>Loading...</ThemedText>}
      {calories !== null && !loading && (
        <ThemedText>
          {calories > 0 ? `Calories: ${calories}` : 'Item not found or error'}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
});
