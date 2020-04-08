import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/MapScreen';
import ParamsScreen from '../screens/ParamsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {

    navigation.setOptions({headerTitle: getHeaderTitle(route)});

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: 'Carte',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-compass"/>,
                }}
            />
            <BottomTab.Screen
                name="Params"
                component={ParamsScreen}
                options={{
                    title: 'Paramétrage',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-settings"/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Map':
            return 'Carte';
        case 'Params':
            return 'Paramètres';
        default:
            return 'Carte';
    }
}
