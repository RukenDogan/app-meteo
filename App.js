import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import Config from 'react-native-config';

import { loadWeatherData } from './controllers/weatherController';

import WeatherCurrentView from './components/weatherCurrentView';
import WeatherForecastView from './components/weatherForecastView';

const bgImage = {uri: 'https://images.unsplash.com/photo-1746234649163-cfa9173bdfde?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'};

export default function App() {

  // État pour stocker les données météo
  const [weatherData, setWeatherData] = useState(null);

  // État pour indiquer si les données sont en cours de chargement
  const [isLoading, setIsLoading] = useState(true);

  // État pour stocker les erreurs éventuelles
  const [error, setError] = useState(null);

  // Chargement des données météo au démarrage de l'application
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await loadWeatherData(); // Appel à la fonction pour charger les données météo
        setWeatherData(data); // Mise à jour de l'état avec les données récupérées
      } catch (err) {
        setError(err.message || 'Erreur inconnue'); // En cas d'erreur, on met à jour l'état error
      } finally {
        setIsLoading(false); // Fin du chargement dans tous les cas
      }
    };

    fetchWeather(); // Appel de la fonction asynchrone
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une seule fois (au montage)


  // Si une erreur est survenue, on affiche un message d'erreur
  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={[styles.errorText]}>
          X {error}
        </Text>
      </SafeAreaView>
    );
  }

  // Si tout est chargé correctement, on affiche la météo actuelle et les prévisions
  return (

    <SafeAreaView style={styles.container}>
      <ImageBackground source={bgImage} style={styles.bgImage}>

        {weatherData && (
          <>
            <WeatherCurrentView data={weatherData.currentWeather} />
            <WeatherForecastView data={weatherData.forecast} />
          </>
        )}
      </ImageBackground >
    </SafeAreaView>

  );
}

// Styles de l'application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2980b9',
    paddingTop: 40,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },

  bgImage: {
    flex: 1,
    resizeMode: 'cover',
  },

});
