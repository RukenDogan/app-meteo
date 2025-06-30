import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default function WeatherForecastView({ data }) {
    // On récupère la date du jour une seule fois
    const today = new Date().getDate();

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        const dayName = dayNames[date.getDay()];
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        if (date.getDate() === today) {
            return `${dayName} ${hours}:${minutes}`; // Aujourd'hui → affiche l’heure
        } else {
            return `${dayName} ${day}/${month}`; // Autres jours → affiche la date
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data.list}
                keyExtractor={(item) => item.dt.toString()}
                renderItem={({ item }) => (
                    <View style={styles.dayContainer}>
                        <Text style={styles.day}>{formatDateTime(item.dt_txt)}</Text>
                        <Image
                            source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                            style={styles.icon}
                        />
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
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    day: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    temperature: {
        fontSize: 16,
        color: '#333',
    },

    description: {
        fontSize: 16,
        color: '#666',
    },

    icon: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },

});
