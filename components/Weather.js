import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const API = {
    url: process.env.EXPO_PUBLIC_API_KEY_URL,
    key : process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL,
    
};

export default function Weather(props) {
    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const url = API.url +
            'lat=' + props.latitude +
            '&lon=' + props.longitude +
            '&units=metric' +
            '&appid=' + API.key;

        fetch(url)
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                setTemp(json.main.temp);
                setDescription(json.weather[0].description);
                setIcon(API.icons + json.weather[0].icon + '@2x.png');
            })
            .catch((error) => {
                setDescription("Error retrieving weather information.");
                console.log(error);
            });
    }, [props.latitude, props.longitude]);

    return (
        <View style={styles.container}>
            <Text style={styles.temp}>{temp}</Text>
            {icon && (
                <Image source={{ uri: icon }} style={{ width: 100, height: 100 }} />
            )}
            <Text>{description}</Text>
        </View>
    );
}

const styles = {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    temp: {
        fontSize: 24,
        fontWeight: 'bold',
    },
};
