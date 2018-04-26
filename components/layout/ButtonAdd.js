import React from 'react'
import { white, gray_back } from '../../utils/colors'
import { Entypo } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function ButtonAdd({ onPress }){
    return (
        <TouchableOpacity style={ styles.btn } onPress={ onPress } >
            <Entypo style={ styles.icon } size={ 40 } name={'circle-with-plus'}  /> 
        </TouchableOpacity>
    )
}
//color={ gray_back } size={ 60 } name={'circle-with-plus'} />
const styles = StyleSheet.create({
    btn:{
        width: 220,
        marginBottom: 10
    },
    icon: { 
        alignSelf: 'flex-end',
        color:gray_back
    },
})