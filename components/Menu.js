//Menu opcional
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ButtonResponse from './layout/ButtonResponse'
import DeckAdd from './DeckAdd'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { white } from '../utils/colors'
import styled from 'styled-components';

class Menu extends Component {

    state = {
        addModal: false
    }

    componentDidMount() {
        fetchDecks()
            .then(decks => this.props.dispatch(receiveDecks(decks)))
    }

    toggleAddModal = () => {
        const addModal = !this.state.addModal
        this.setState({
            addModal
        })
    }

    render() {
        const { addModal } = this.state

        return (
            <Container>
                <ButtonResponse text={"Baralhos"} onPress={() => this.props.navigation.navigate('Decks')} />
                <ButtonResponse text={"Criar Baralho"} onPress={this.toggleAddModal} />
                <DeckAdd addModal={addModal} onClose={this.toggleAddModal} />
            </Container>
        )
    }
}

const Container= styled.Container`
    flex: 1;
    background-color: ${white};
    align-items: center;
    justify-content: center;
`

function mapStateToProps(decks) {
    return decks
}

export default connect(mapStateToProps)(Menu)


