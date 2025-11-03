// components/CalorieSearch.tsx
import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedButton } from '../ui/ThemedButton';
import { ThemedTextInput } from '../ui/ThemedTextInput';


export default function CalorieSearch() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const searchCalories = async () => {
    if (!food) return;
    setLoading(true);
    try {
      const API_KEY = '';
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `Estimate the calories for: ${food}. Respond with ONLY a number representing the calories, nothing else.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const calorieNumber = parseInt(text.match(/\d+/)?.[0] || '0');
      setCalories(calorieNumber);
    } catch (error) {
      console.error('Error:', error);
      setCalories(0);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ThemedTextInput
        style={styles.input}
        placeholder="Enter food item (e.g., 'apple' or '100g chicken breast')"
        value={food}
        onChangeText={setFood}
      />
      <ThemedButton title="Search Calories" onPress={searchCalories} />
      {loading && <ThemedText>Loading...</ThemedText>}
      {calories !== null && !loading && (
        <ThemedText>
          {calories > 0 ? `Calories: ${calories}` : 'Could not estimate calories'}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 10,
    backgroundColor: '#fff'
  },
});