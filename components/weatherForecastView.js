import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { List } from 'react-native-paper';

// Fonction pour grouper les prévisions par jour
const groupByDay = (list) => {
    return list.reduce((acc, item) => {
        const date = new Date(item.dt_txt);
        const day = date.getDate();
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(item);
        return acc;
    }, {});
};

export default function WeatherForecastView({ data }) {

    const groupedData = groupByDay(data.list); // Groupe les prévisions par jour
    const [expandedDays, setExpandedDays] = useState({}); // Tableau de booléens pour indiquer si un jour est ouvert ou non

    // Fonction pour ouvrir ou fermer un jour
    const toggleDay = (day) => {
        setExpandedDays({
            ...expandedDays,
            [day]: !expandedDays[day],
        });
    };



    // On récupère la date du jour une seule fois
    const today = new Date().getDate();

    const formatDayHeader = (dateTime) => { // Fonction pour formater la date et l'heure
        const date = new Date(dateTime); // On crée un objet Date à partir de la chaîne de caractères
        const formatWithZero = (number) => number < 10 ? '0' + number : number; // Fonction pour formater les nombres (ajoute un zéro devant le chiffre en dessous de 10)
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const dayName = dayNames[date.getDay()]; // On récupère le nom du jour de la semaine
        const day = formatWithZero(date.getDate()); // On récupère la date du jour
        const month = formatWithZero(date.getMonth() + 1); // les mois commencent à 0, donc on ajoute 1
        const hours = date.getHours(); // On récupère l'heure

        return `${dayName} ${day}/${month} ${hours}h`; // Affiche la date et l'heure pour les autres jours

    };

    // Liste déroulante pour afficher la liste des prévisions par jour
    return (
        <ScrollView style={styles.container}>
            <List.Section title="Prévisions pour 5 jours">
                {Object.keys(groupedData).map(day => (
                    <List.Accordion style={styles.accordion}
                        key={day}
                        title={formatDayHeader(day)}
                        expanded={!!expandedDays[day]}
                        onPress={() => toggleDay(day)}
                        left={() => {
                            // Icon du premier créneau de la journée
                            const icon = groupedData[day][0].weather[0].icon;
                            return (
                                <Image
                                    source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
                                    style={styles.icon}
                                />
                            );
                        }}
                    >
                        {groupedData[day].map(item => (
                            <List.Item
                                key={item.dt}
                                title={`${new Date(item.dt_txt).getHours()}h`}
                                description={item.weather[0].description}
                                left={() => (
                                    <Image
                                        source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                                        style={styles.smallIcon}
                                    />
                                )}
                                right={() => (
                                    <Text style={styles.tempText}>{Math.round(item.main.temp)}°C</Text>
                                )}
                            />
                        ))}
                    </List.Accordion>
                ))}
            </List.Section>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginBottom: 60,
    },

    dayContainer: {
        // marginBottom: 10,
        // backgroundColor: '',
        // borderRadius: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: 170, // Largeur fixe pour chaque jour
        // marginRight: 10, // Espace entre les jours

        // // Ombres iOS
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        // // Ombres Android
        // elevation: 5,
    },

    // day: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     marginBottom: 5,
    //     textAlign: 'center',
    //     backgroundColor: '#fffdfe',
    // },

    // description: {
    //     fontSize: 18,
    //     color: '#666',
    //     textAlign: 'center',
    // },

    icon: {
        width: 70,
        height: 70,
        marginBottom: 5,
    },

    smallIcon: {
        width: 30,
        height: 30,
        marginRight: 8,
    },

    tempText: {
        alignSelf: 'center',
        marginRight: 16,
        fontWeight: 'bold',
        color: '#0f4b6e',
    },

    accordion: {
        backgroundColor: '#fffdfe',
        // borderRadius: 12,
        // marginBottom: 16,

        // ombre iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        // ombre Android
        elevation: 3,

        // petite barre colorée à gauche
        borderLeftWidth: 5,
        borderLeftColor: '#0f4b6e',

    },
});
