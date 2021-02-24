import React,{useState,useEffect} from 'react'
import {StyleSheet, View,ScrollView, Text } from 'react-native'
import {Title} from 'react-native-paper';
import {map} from 'lodash'
import CarouselVertical from '../components/CarouselVertical'
import {getNewsMoviesApi,getAllGenreApi,getGenreMovieApi } from '../api/movies'



const Home = (props) => {
    const {navigation} = props;

    const [newMovies, setNewMovies] = useState(null)

   const [genreList, setGenreList] = useState([])
   // console.log(newMovies);
   const [genreSelected, setGenreSelected] = useState(28)

   //guarda las peliuclas de los generos seleccionados
   const [genreMovies, setGenreMovies] = useState(null)

   console.log(genreMovies)

    useEffect(() => {
      getNewsMoviesApi().then((response)=>{

        setNewMovies(response.results)
      })
    
       
    }, []);

  

    useEffect(() => {
        getAllGenreApi().then((response)=>{
            
           setGenreList(response.genres)
        })
        
    }, [])


    //para la lista de generos en la pantalla principal

    useEffect(() => {
       
        getGenreMovieApi(genreSelected).then((response)=>{
            setGenreMovies(response.results)
        })
    }, [genreSelected])


    //para seleccionar un genero de la lista

    const onChanngeGenre = (newGenreId) =>{

        setGenreSelected(newGenreId)
    }



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
            
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
                    {map(genreList,(genre)=>(
                        <Text key={genre.id} style={[styles.genre, {color : genre.id !== genreSelected ? "#8697a5" :"#fff"}, 
                        ]} onPress={()=> onChanngeGenre(genre.id)}>
                            {genre.name}
                        </Text>

                    ))}
                </ScrollView>
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
    },
    genreList:{
        marginTop:5,
        marginBottom:15,
        paddingHorizontal:20,
        padding:10
    },
    genre:{
        marginRight:20,
        fontSize:16
    }
})
