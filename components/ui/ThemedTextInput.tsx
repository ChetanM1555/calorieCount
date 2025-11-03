import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export function ThemedTextInput(props: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholderTextColor="#888" // grey placeholder
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
});