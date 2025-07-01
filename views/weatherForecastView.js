import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default function WeatherForecastView({ data }) {
    // On récupère la date du jour une seule fois
    const today = new Date().getDate();

    const formatDateTime = (dateTime) => { // Fonction pour formater la date et l'heure
        const date = new Date(dateTime); // On crée un objet Date à partir de la chaîne de caractères
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']; 
        const dayName = dayNames[date.getDay()]; // On récupère le nom du jour de la semaine
        const day = date.getDate(); // On récupère le jour du mois
        const month = date.getMonth() + 1; // les mois commencent à 0, donc on ajoute 1
        const hours = date.getHours(); // On récupère l'heure

        if (date.getDate() === today) { // Si c'est aujourd'hui
            return `${dayName} ${hours} h`; // Affiche l'heure pour aujourd'hui
        } else {
            return `${dayName} \n${day}/${month} \n${hours} h`; // Affiche la date pour les autres jours
        }        
    };

    // FlatList pour afficher la liste des prévisions
    return (
        <View style={styles.container}>
            <FlatList
                data={data.list}
                keyExtractor={(item) => item.dt.toString()}
                horizontal={true} // Affichage horizontal
                showsHorizontalScrollIndicator={false} // Masque la barre de défilement horizontale
                renderItem={({ item }) => (
                    <View style={styles.dayContainer}>
                        <Text style={styles.day}>{formatDateTime(item.dt_txt)}</Text>
                        <Image
                            source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                            style={styles.icon}
                        />
                                
                        <Text style={styles.temperature}>{Math.round(item.main.temp)}°C</Text> 
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
        marginBottom: 100,
        backgroundColor: '#e3e8e4',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150, // Largeur fixe pour chaque jour
        marginRight: 10, // Espace entre les jours
    },

    day: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },

    temperature: {
        fontSize: 24,
        color: '#0f4b6e',
        fontWeight: 'bold',
    },

    description: {
        fontSize: 18,
        color: '#666',
    },

    icon: {
        width: 70,
        height: 70,
        marginBottom: 5,
    },

});
