import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import ButtonResponse from './layout/ButtonResponse'
import { gray, white } from './../utils/colors'
import Modal from "react-native-modal"
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api';

class DeckAdd extends Component {
    state={
        title:''
    }

    createDeck = () => { 
        const { title } = this.state       
        if (title === ''){
            alert('Dê um nome ao seu baralho !')
        }
        else{
            this.props.dispatch(addDeck(title))
            saveDeck(title)
            this.props.navigation.navigate(
                'Deck',
                { deck_title: title }
            )
            this.props.onClose()
        }
    }

    render(){
        const { title } = this.state
        const { onClose, addModal } = this.props
        const { createDeck } = this
        //const { toggleAddModal } = this.props
        return (

            <Modal 
                isVisible={addModal}
                onBackdropPress={ onClose }
                // backdropOpacity= {.9}
            >
                <View style={ styles.container }>
                    <Text style={{ fontSize: 30 }} >Adicionar Baralho</Text>
                    <TextInput value={ title } style={ styles.input } autoFocus={ true }
                        onChangeText={(title) => this.setState({title}) } placeholder={"Nome do baralho"} /> 
                    <View>
                        <ButtonResponse onPress={ createDeck } btnStyle={{ marginBottom:10 }} text={"Ok"} />
                        <ButtonResponse onPress={ onClose } text={"Cancelar"} />
                    </View>                    
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
        marginVertical: 80,
        borderRadius: 10,
        paddingTop: 30,
        paddingBottom: 10
    },
    input: {
        width: 250,
        fontSize: 25,
        textAlign: 'center',
        padding: 10
    }
})

export default connect()(DeckAdd)