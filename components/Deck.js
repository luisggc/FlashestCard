import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import ButtonResponse from './layout/ButtonResponse'
import { connect } from 'react-redux'
import { DECKS_STORAGE_KEY, sort_array } from '../utils/helpers';
import CardAdd from './CardAdd'
import { removeCardDB } from '../utils/api'
import { removeCard } from '../actions'
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
        const { title, questions } = deck
        const count = questions.length

        return (
            <ScrollView contentContainerStyle={styles.container} >
                <View style={styles.headerView}>
                    <Text style={styles.title} >{title}</Text>
                    <View>
                        <Text style={styles.description} >Número de perguntas: {count}</Text>
                        <Text style={styles.description} >Tempos estimado: {count * 5}s</Text>
                    </View>
                </View>
                <ButtonAdd onPress={this.toggleAddModal} />
                <CardAdd title={title} addModal={addModal} onClose={this.toggleAddModal} />

                {count > 0 ?
                    <ButtonResponse
                        onPress={() => this.props.navigation.navigate(
                            'Quiz',
                            { title, questions: sort_array(questions) }
                        )}
                        text={"Quiz"} />
                    :
                    <Text>Adicione perguntas no botão acima</Text>
                }

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
    },
    deleteCard: {
        width: 220,
        flexDirection: 'row',
    },
    icon: {
        marginRight: 0,
        marginLeft: 'auto',
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    },
    description: {
        fontSize: 15,
        textAlign: 'center'
    },
    headerView: {
        marginTop: 50,
        marginBottom: 20
    }
})

function mapStateToProps({ decks }, props) {
    const { deck_title } = props.navigation.state.params
    return { deck: decks[deck_title] }
}

export default connect(mapStateToProps)(Deck)