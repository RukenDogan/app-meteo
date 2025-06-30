import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherCurrentView({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.temperature}>{data.main.temp}°C</Text>
      <Text style={styles.description}>{data.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },

  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },

  description: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },

});