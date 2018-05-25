import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { white, gray_back } from '../../utils/colors'

export default function ButtonResponse(props) {
    const { text, onPress, btnStyle, textStyle, total } = props
    return (
        <TouchableOpacity style={[styles.btn, btnStyle]} onPress={onPress} >
            <Text style={[styles.text, textStyle]} >
                {text}
            </Text>
            {typeof total !== 'undefined' ? (
                <View style={styles.total} >
                    <Text style={{ color: gray_back }}>{total}</Text>
                </View>
            ) : null}


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: 220,
        backgroundColor: gray_back,
        marginBottom: 30
    },
    text: {
        fontSize: 25,
        color: white,
        textAlign: 'center'
    },
    total: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
    }
})