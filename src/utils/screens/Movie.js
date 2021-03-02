import React,{useState,useEffect} from 'react'
import { StyleSheet,  View, Image,ScrollView } from 'react-native'
import {Text,Title,IconButton} from 'react-native-paper'
import ModalVideo from '../components/ModalVideo'
import {getMovieById} from '../api/movies'
import {BASE_PATH_IMG} from '../constans'

export default function Movie(props) {

    const {route} = props
    const {id} = route.params;

    const [movie, setmovie] = useState(null)
    const [showvideo, setShowVideo] = useState(false)

    useEffect(() => {
        
        getMovieById(id).then((response)=>{
            setmovie(response)
            
        })
    }, [])

    if(!movie) return null;
    return (
        <>
            <ScrollView>
                <MovieImage posterPath={movie.poster_path} />
                <MovieTrailler setShowVideo={setShowVideo}/>
            </ScrollView>

            <ModalVideo show={showvideo} setShow={setShowVideo} idMovie={id} />

        </>
    )
}


function MovieImage(props){
   

    const {posterPath}= props;

    return(
        <View style={styles.viewPotser}>
            <Image style={styles.poster} source={{uri: `${BASE_PATH_IMG}/w500${posterPath}`}}/>
        </View>
    )
}

function MovieTrailler(props){

    const {setShowVideo} = props;

    return(
        <View style={styles.viewPlay}>
            <IconButton
                icon="play"
                color="#000"
                size={30}
                style={styles.play}
                onPress={()=> setShowVideo(true)}
            />
        </View>
    )

}


const styles = StyleSheet.create({
    viewPotser:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:20
        },
        shadowOpacity:1,
        shadowRadius:10
    },
    poster:{
        width:"100%",
        height:500,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    },
    viewPlay:{
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    play:{
        backgroundColor:"#fff",
        marginTop:-40,
        marginRight:30,
        width:60,
        height:60,
        borderRadius:100
    }
})