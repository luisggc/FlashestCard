import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { dummyData } from '../utils/helpers'
import ButtonResponse from './layout/ButtonResponse'
import { connect } from 'react-redux'
import ButtonAdd from './layout/ButtonAdd'
import DeckAdd from './DeckAdd'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { white, green } from '../utils/colors'
import { AppLoading } from 'expo'

class Decks extends Component {

    state = {
        addModal: false,
        ready: false
    }

    componentDidMount() {
        fetchDecks()
            .then(decks => this.props.dispatch(receiveDecks(decks)))
            .then(() => this.setState({
                ready: true
            }))
        console.log("didmount")
    }

    toggleAddModal = () => {
        const addModal = !this.state.addModal
        this.setState({
            addModal
        })
    }

    renderItem = ({ item }) => {
        return (
            <ButtonResponse
                onPress={() =>
                    this.props.navigation.navigate(
                        'Deck',
                        { deck_title: item.title }
                    )}
                text={item.title}
                total={item.count}
            />
        )
    }

    header = () => {
        return (
            <ButtonAdd onPress={this.toggleAddModal} />
        )
    }

    render() {

        const { addModal, ready } = this.state

        if (!ready) {
            return <AppLoading />
        }
        console.log("loaded")
        const { decks } = this.props
        return (
            <View style={styles.container} >
                <DeckAdd
                    addModal={addModal}
                    onClose={this.toggleAddModal}
                    navigation={this.props.navigation}
                />
                <FlatList
                    ListHeaderComponent={this.header}
                    data={decks}
                    keyExtractor={(item) => item.title}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60
    }
})

function mapStateToProps({ decks }) {
    return typeof decks !== 'undefined'
        ? {
            decks: Object.keys(decks).map(key => {
                return ({
                    title: decks[key].title,
                    count: decks[key].questions.length,
                })
            })
        }
        : { decks }
}

export default connect(mapStateToProps)(Decks)

/* {decks.map( (deck_title) => (
                    <ButtonResponse 
                        onPress={ () => 
                            this.props.navigation.navigate(
                                'Deck',
                                {  deck_title }
                            )} 
                        key={deck_title} 
                        text={deck_title}
                    />
                ))} */