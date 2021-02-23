import React,{useState,useEffect} from 'react'
import {StyleSheet, View,ScrollView, Text } from 'react-native'
import {Title} from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical'
import {getNewsMoviesApi } from '../api/movies'

const Home = (props) => {
    const {navigation} = props;

    const [newMovies, setNewMovies] = useState(null)

   // console.log(newMovies);

    useEffect(() => {
      getNewsMoviesApi().then((response)=>{

        setNewMovies(response.results)
      })
    
       
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas Peliculas</Title>
                
                <CarouselVertical data={newMovies} navigation={navigation}/>
                </View>
            )}

            <View style = {styles.genres}>
                <Title style={styles.genresTitle}>Peliculas por Género</Title>
            </View>
        </ScrollView>
    )
}

export default Home


const styles = StyleSheet.create({
    news:{
        marginVertical:10,

    },
    newsTitle:{
        marginBottom:15,
        marginHorizontal:20,
        fontWeight:"bold",
        fontSize:22
    },
    genres:{
        marginTop:20,
        marginBottom:50, //seára del pie de la app
        
    },
    genresTitle:{
        marginHorizontal:20,
        fontWeight:'bold',
        fontSize:22
    }
})
