import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type ThemedButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function ThemedButton({ title, onPress, disabled }: ThemedButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
  },
});