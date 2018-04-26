import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import ButtonResponse from './layout/ButtonResponse'
import { connect } from 'react-redux'
import { DECKS_STORAGE_KEY } from '../utils/helpers';
import CardAdd from './CardAdd'
import { removeCardDB } from '../utils/api'
import { removeCard } from '../actions'
// import { white } from '../utils/colors'
import ButtonAdd from './layout/ButtonAdd'
import Ionicons from '@expo/vector-icons/Ionicons';
import { gray_back } from './../utils/colors';

class Deck extends Component {
    
    static navigationOptions = ({ navigation }) => (
        {
            title: navigation.state.params.deck_title
        }
    )

    state = {
        addModal: false,
        showQuestions: false
    }

    toggleAddModal = () => {
        const addModal = !this.state.addModal
        this.setState({
            addModal
        })
    }

    toggleDeleteCards = () => {
        const showQuestions = !this.state.showQuestions
        this.setState({
            showQuestions
        })
    }

    removeCard = (question) => {
        const { title } = this.props.deck
        this.props.dispatch(removeCard(question, title))
        removeCardDB(question, title)
    }

    render() {

        const { addModal, showQuestions } = this.state
        const { deck } = this.props
        const showQuestion_text = showQuestions ? "Ocultar" : "Exibir perguntas"
        return (
            <ScrollView contentContainerStyle={styles.container} >

                <ButtonAdd onPress={this.toggleAddModal} />
                <CardAdd title={deck.title} addModal={addModal} onClose={this.toggleAddModal} />
                <ButtonResponse onPress={() => this.props.navigation.navigate(
                    'Quiz',
                    { ...deck }
                )}
                    text={"Quiz"} />
                <View>
                    <ButtonResponse onPress={this.toggleDeleteCards} text={showQuestion_text} />
                    <View>
                        {showQuestions && deck.questions.map(q => (
                            <View key={q.question} style={styles.deleteCard} >
                                <Text style={{ textAlign: 'left' }}>{q.question}</Text>
                                <TouchableOpacity style={styles.icon} onPress={() => this.removeCard(q.question)} >
                                    <Ionicons color={gray_back} name={'md-close-circle'} size={15} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteCard: {
        width: 220,
        flexDirection: 'row',
        // alignSelf: 'center',
        // justifyContent: 'center',
    },
    icon: {
        marginRight: 0,
        marginLeft: 'auto',
        // color: gray_back,
        alignSelf: 'flex-end'
    }
})

function mapStateToProps({ decks }, props) {
    const { deck_title } = props.navigation.state.params
    return { deck: decks[deck_title] }
}

export default connect(mapStateToProps)(Deck)