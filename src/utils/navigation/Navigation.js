import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent'
import StackNavigation from './StackNavigation'

const Drawer = createDrawerNavigator()

export default function Navigation() {
    return (
        <Drawer.Navigator initialRouteName="App" drawerContent={(props) => <DrawerContent {...props}/>}>
            <Drawer.Screen name="App" component={StackNavigation}/>
        </Drawer.Navigator>
    )
}

