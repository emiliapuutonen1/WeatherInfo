import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet } from 'react-native'; 
import Weather from './Weather';

export default function Position() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [message, setMessage] = useState('Retrieving location....');
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status);
            try {
                if (status !== 'granted') {
                    setMessage("Location not permitted");
                } else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setMessage('Location retrieved');
                    setIsloading(false); // Set loading state to false after location retrieval
                }
            } catch (error) {
                setMessage("Error retrieving location.");
                console.log(error);
                setIsloading(false); // Set loading state to false in case of error
            }
        })();
    }, []); // Run the effect only once when the component mounts

    return (
        <View style={styles.container}>
            <Text style={styles.coords}>{latitude.toFixed(3)},{longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false && 
            <Weather latitude={latitude} longitude={longitude}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coords: {
        fontSize: 20,
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: 'gray',
    },
});
