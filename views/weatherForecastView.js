import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function WeatherForecastView({ data }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data.list} // <-- ici
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.day}>{item.dt_txt}</Text>
            <Text style={styles.temperature}>{item.main.temp}°C</Text>
            <Text style={styles.description}>{item.weather[0].description}</Text>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dayContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
}); 
