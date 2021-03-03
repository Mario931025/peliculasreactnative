import React, {useState,useEffect} from 'react'
import { StyleSheet, View,ScrollView,Image,TouchableNativeFeedback } from 'react-native'
import {Text, Title,Button} from 'react-native-paper'
import {map} from 'lodash'
import {Rating} from 'react-native-ratings'
import {getPopularMovieApi} from '../api/movies'
import {BASE_PATH_IMG} from '../constans'
import usePreferences from '../hooks/usePreferences'
import noImage from '../../assets/png/default-imgage.png'
import starDark from '../../assets/png/starDark.png';
import starLight from '../../assets/png/starLight.png'

export default function Popular(props) {

const {navigation} = props;
const [movies, setMovies] = useState(null);
const [showBtnMore, setshowBtnMore] = useState(true)
const [page, setpage] = useState(1)
const {theme} =usePreferences()



useEffect(() => {
    
    getPopularMovieApi(page).then((response)=>{

        const totalPages = response.total_pages;
        if(page < totalPages){
            if(!movies){
                setMovies(response.results)
            }else{
                setMovies([...movies,...response.results])
            }
        }else{
            setshowBtnMore(false)
        }
    })
}, [page])

    return (
        <ScrollView>
            {map(movies,(movie,index)=>(
                    <Movie key={index} movie={movie} theme={theme} navigation={navigation} />
            ))}

        {showBtnMore && (
            <Button
                mode="contained"
                contentStyle={styles.lodadMoreContainer}
                style={styles.lodadMode}
                labelStyle={{color: theme === "dark" ? "#fff" : "#000"}}
                onPress={()=> setpage(page+1)}
            >
                Cargar más...
            </Button>
        )}
        </ScrollView>
    )
}



function Movie(props){

    const {movie,theme,navigation} = props;

    const {id,poster_path,title,release_date,vote_count,vote_average} = movie;

    
    const goMovie = ()=>{
        navigation.navigate("movie",{id})
    }
    
    
    return(
        <TouchableNativeFeedback onPress={goMovie}>
        <View style={styles.movie}>
            <View style={styles.left}>
                <Image
                    style={styles.img}
                    source={
                        poster_path ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`}
                        : noImage
                    }
                />
            </View>
            <View>
                <Title>{title}</Title>
                <Text>{release_date}</Text>
                <MovieRating voteCount={vote_count} voteAverage={vote_average} theme={theme} />
            </View>
        </View>
        </TouchableNativeFeedback>
    )
}

function MovieRating(props) {
const { theme,voteCount,voteAverage} = props;

const media = voteAverage /2;

    return(
        <View style={styles.viewRating}>
             <Rating
             type="custom"
             ratingImage={theme === "dark" ? starDark : starLight}
             ratingColor="#ffc205"
             ratingBackgroundColor={theme === "dark" ? "#192734" : "#f0f0f0"}
            startingValue={media}
            imageSize = {20}
            style={{marginRight:15}}
            />
            <Text style={{ fontSize:12,color:"#8697a5",marginTop:5}}>
                {voteCount} votos
            </Text>
        </View>
           
    )
}




const styles = StyleSheet.create({
    movie:{
        marginBottom:20,
        flexDirection:"row",
        alignItems:"center"
    },
    left:{
        marginRight:20,

    },
    img:{
        width:100,
        height:150
    },
    viewRating:{
        alignItems:"flex-start",
        justifyContent:"flex-start",
        marginTop:10
    },
    lodadMoreContainer:{
        paddingTop:10,
        paddingBottom:30
    },
    lodadMode:{
        backgroundColor:"transparent"
    }
})

