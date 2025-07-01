import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { loadWeatherData } from './controllers/weatherController';

import WeatherCurrentView from './views/weatherCurrentView';
import WeatherForecastView from './views/weatherForecastView';
import LoaderView from './views/loaderView';

export default function App() {
  const [weatherData, setWeatherData] = useState(null); // État pour stocker les données météo
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
  const [error, setError] = useState(null); // État pour stocker les erreurs éventuelles

  // Utilisation de useEffect pour charger les données météo au démarrage de l'application
  useEffect(() => {
    const fetchWeather = async () => { // Fonction asynchrone pour charger les données météo
      try {
        const data = await loadWeatherData(); // Appel à la fonction pour charger les données météo
        setWeatherData(data);
      } catch (err) {
        setError(err.message || 'Erreur inconnue'); // En cas d'erreur, on met à jour l'état error
      } finally {
        setIsLoading(false); // On met à jour l'état isLoading pour indiquer que le chargement est terminé
      }
    };

    fetchWeather(); // Appel de la fonction pour charger les données météo
  }, []); // Le tableau vide [] signifie que l'effet ne s'exécute qu'une seule fois, au démarrage de l'application

  if (isLoading) { // Si les données sont en cours de chargement, on affiche le LoaderView
    return <LoaderView />; // Affichage du LoaderView pendant le chargement des données
  }

  // Si une erreur est survenue, on affiche un message d'erreur
  if (error) { 
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>X {error}</Text>
      </SafeAreaView>
    );
  }

  // Si les données sont chargées avec succès, on affiche les vues de météo actuelle et de prévisions
  return (
    <SafeAreaView style={styles.container}>
      <WeatherCurrentView data={weatherData.currentWeather} />
      <WeatherForecastView data={weatherData.forecast} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7bc7dd',
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
});

