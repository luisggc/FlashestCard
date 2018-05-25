import React from 'react'
import { white, gray_back } from '../../utils/colors'
import { Entypo } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components';

export default function ButtonAdd({ onPress }) {
    return (
        <BlackButton onPress={onPress} >
            <Entypo style={styles.icon} size={40} name={'circle-with-plus'} />
        </BlackButton>
    )
}

const BlackButton= styled.TouchableOpacity`
    width: 220;
    margin-bottom: 20;
`


const styles = StyleSheet.create({
    icon: {
        alignSelf: 'flex-end',
        color: gray_back
    }
})