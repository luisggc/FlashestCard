import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import ButtonResponse from './layout/ButtonResponse'
import { gray, white } from './../utils/colors'
import Modal from "react-native-modal"
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { saveCard } from '../utils/api';

class CardAdd extends Component {
    state = {
        question: '',
        answer: '',
    }

    createCard = () => {
        const { title, onClose } = this.props
        const { question, answer } = this.state
        if (question === '' || answer === '') {
            alert('Dê uma pergunta e resposta a sua carta !')
        } else {
            this.props.dispatch(addCard(question, answer, title))
            saveCard(question, answer, title).then((e) => { console.log("after", e) })
            onClose()
            // saveDeck(title)
        }
    }

    render() {
        const { question, answer } = this.state
        const { onClose, addModal } = this.props
        const { createCard } = this

        return (

            <Modal
                isVisible={addModal}
                onBackdropPress={onClose}
            >
                <View style={styles.container}>
                    <Text style={{ fontSize: 30 }} >Adicionar Pergunta</Text>

                    <View>
                        <TextInput value={question} style={[styles.input, { marginBottom: 10 }]} autoFocus={true}
                            onChangeText={(question) => this.setState({ question })} placeholder={"Pergunta"} />

                        <TextInput value={answer} style={styles.input}
                            onChangeText={(answer) => this.setState({ answer })} placeholder={"Resposta"} />
                    </View>

                    <View>
                        <ButtonResponse onPress={createCard} btnStyle={{ marginBottom: 10 }} text={"Ok"} />
                        <ButtonResponse onPress={onClose} text={"Cancelar"} />
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

export default connect()(CardAdd)