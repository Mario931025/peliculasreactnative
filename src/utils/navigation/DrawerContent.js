import React,{useState} from 'react'
import { StyleSheet, View} from 'react-native'
import {DrawerContentScrollView} from '@react-navigation/drawer'
import {Drawer,Switch,TouchableRipple,Text} from "react-native-paper"
import usePreference from '../hooks/usePreferences'


export default function DrawerContent(props) {


    const {navigation} = props;

    const [Active, setActive] = useState("home")
    const {theme,toggleTheme} = usePreference(); //datos de la preferencia del tema




    const onChangeScreen = (screen) =>{
        setActive(screen);
        navigation.navigate(screen);
    }

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                label="Inicio"
                active={Active === "home"}
                onPress={()=> onChangeScreen("home")}
               />
               <Drawer.Item
                label="Peliculas populares"
                active={Active === "popular"}
                onPress={()=> onChangeScreen("popular")}
               />
               <Drawer.Item
                label="Nuevas peliculas"
                active={Active === "news"}
                onPress={()=> onChangeScreen("news")}
               />
            </Drawer.Section>
            <Drawer.Section title="Opciones">
                <TouchableRipple>
                    <View style={styles.preference}>
                        <Text>Tema Oscuro</Text>
                        <Switch value={theme === "dark" ? true : false} onValueChange={toggleTheme}/>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preference:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingVertical:12,
        paddingHorizontal:16

    }
})
