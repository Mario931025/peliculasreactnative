import React from 'react'
import {StyleSheet} from 'react-native'
import {Modal,IconButton,Title} from 'react-native-paper'


const ModalVideo = (props) => {

    const {show,setShow}= props; 

    return (
        <Modal visible={show} contentContainerStyle={StyleSheet.modal}>
                <Title>Modal</Title>
                <IconButton
                    icon="close"
                    onPress={()=> setShow(false)}
                    style={styles.close}
                />
        </Modal>
    )
}

export default ModalVideo


const styles = StyleSheet.create({
    modal:{
        backgroundColor:"#000",
        height:"120%",
        alignItems:"center"
    },
    close:{
        backgroundColor:"#1ea1f2",
        width:50,
        height:50,
        borderRadius:100,
        position:"absolute",
        bottom:100
    }
})