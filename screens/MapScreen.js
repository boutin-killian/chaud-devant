import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';

import io from 'socket.io-client/dist/socket.io';

export default function MapScreen({navigation, route}) {
    const [filters, setFilters] = useState({flux: false, temp: false, water: false});
    const [year, setYear] = useState(2000);
    const filterImg = {
        '2000': {
            'flux': require('../assets/images/map/flux/2000.png'),
            'temp': require('../assets/images/map/temp/2000.png'),
            'water': require('../assets/images/map/water/2000.png')
        },
        '2100': {
            'flux': require('../assets/images/map/flux/2100.png'),
            'temp': require('../assets/images/map/temp/2100.png'),
            'water': require('../assets/images/map/water/2100.png')
        },
    };

    useEffect(() => {
        const SocketEndpoint = 'https://d5320a49.ngrok.io';
        const socket = io(SocketEndpoint, {jsonp: false});
        socket.on('changeFilterOnMap', (data) => {
            setYear(data['yearFilter']['year']);
            setFilters(data['filters']);
        })
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <Image
                    style={styles.mapStyle}
                    source={require('../assets/images/map/map.png')}
                />
                {Object.keys(filters).map((key, i) => {
                    if (filters[key]) {
                        return (
                            <Image key={i}
                                   style={styles.mapFilter}
                                   source={filterImg[year][key]}
                            />
                        )
                    }
                })}
            </View>
        </View>
    );
}

MapScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    mapContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mapFilter: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: 0.7
    },
});
