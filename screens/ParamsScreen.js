import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';

import io from 'socket.io-client/dist/socket.io';

var socket;

export default function ParamsScreen() {

    const [noColor, setNoColor] = useState(true);
    const [flux, setFlux] = useState(false);
    const [temp, setTemp] = useState(false);
    const [water, setWater] = useState(false);

    const [year, setYear] = useState('2000');
    const [yearStart, setYearStart] = useState(true);
    const [yearEnd, setYearEnd] = useState(false);

    useEffect(() => {
        const SocketEndpoint = 'https://d5320a49.ngrok.io';
        socket = io(SocketEndpoint, {jsonp: false, forceNode: true});
    }, []);

    useEffect(() => {
        const datas = {
            filters: {
                flux: flux, temp: temp, water: water
            },
            yearFilter: {
                year: year
            }
        };
        socket.emit('changeFilter', datas);
    }, [noColor, flux, temp, water, yearStart, yearEnd]);

    const disableColorExcept = (except) => {
        except === '' ? setNoColor(true) : setNoColor(false);
        except === 'setTemp' ? setTemp(true) : setTemp(false);
        except === 'setWater' ? setWater(true) : setWater(false);
    };

    const disableYearExcept = (except) => {
        except === '2000' ? setYearStart(true) : setYearStart(false);
        except === '2100' ? setYearEnd(true) : setYearEnd(false);
        setYear(except);
    };

    return (
        <View style={styles.container}>
            <Text>Filtre de flux :</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                    center
                    title='Flux migratoires'
                    checked={flux}
                    onPress={() => {
                        setFlux(!flux);
                    }}
                />
            </View>

            <Text>Filtre de couleur : </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                    title='Aucun'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={noColor}
                    onPress={() => disableColorExcept('')}
                />
                <CheckBox
                    title='Température'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={temp}
                    onPress={() => disableColorExcept('setTemp')}
                />
                <CheckBox
                    title='Montée des eaux'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={water}
                    onPress={() => disableColorExcept('setWater')}
                />
            </View>

            <Text>Année : </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                    title='2000'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={yearStart}
                    onPress={() => disableYearExcept('2000')}
                />
                <CheckBox
                    title='2100'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={yearEnd}
                    onPress={() => disableYearExcept('2100')}
                />
            </View>
        </View>
    );
}

ParamsScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#fff',
    },
});
