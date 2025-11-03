// components/KjToCalConverter.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedButton } from './ui/ThemedButton';

export default function KjToCalConverter() {
  const [kilojoules, setKilojoules] = useState('');
  const [calories, setCalories] = useState<number | null>(null);

  const convertToCalories = () => {
    if (!kilojoules) return;
    
    const kjValue = parseFloat(kilojoules);
    
    if (!isNaN(kjValue) && kjValue > 0) {
      // 1 kilojoule = 0.239006 calories
      const calValue = kjValue * 0.239006;
      setCalories(Math.round(calValue));
    } else {
      setCalories(0);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter kilojoules (kJ)"
        value={kilojoules}
        onChangeText={setKilojoules}
        keyboardType="numeric"
      />
      <ThemedButton title="Convert to Calories" onPress={convertToCalories} />
      {calories !== null && (
        <ThemedText>
          {calories > 0 ? `Calories: ${calories}` : 'Please enter a valid number'}
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