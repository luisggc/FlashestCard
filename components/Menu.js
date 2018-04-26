import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ButtonResponse from './layout/ButtonResponse'
import DeckAdd from './DeckAdd'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { white } from '../utils/colors'

class Menu extends Component {

    state= {
        addModal: false
    }

    componentDidMount() {
        fetchDecks()
            .then( decks => this.props.dispatch(receiveDecks(decks)) )
    }   

    toggleAddModal = () => {
        const addModal = !this.state.addModal
        this.setState({
            addModal
        })
    }

    render(){
        const { addModal } = this.state
        // console.log("render\n")
        console.log(JSON.stringify(this.props))

        return (
            <View style={ styles.container } >
                <ButtonResponse text={"Baralhos"} onPress={ () => this.props.navigation.navigate('Decks') } />
                <ButtonResponse text={"Criar Baralho"} onPress={ this.toggleAddModal } />
                <DeckAdd addModal={ addModal } onClose={ this.toggleAddModal } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function mapStateToProps(decks){
    return decks
}

export default connect(mapStateToProps)(Menu)


