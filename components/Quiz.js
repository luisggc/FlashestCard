import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import ButtonResponse from './layout/ButtonResponse'
import { green, red, white, black } from './../utils/colors';
import { sort_array } from './../utils/helpers';

class Quiz extends Component {

    state = {
        showAnswer: false,
        n_question: 0,
        n_correct: 0
    }

    static navigationOptions = ({ navigation }) => (
        {
            title: navigation.state.params.title
        }
    )

    toggleShowAnswer = (c) => {
        let { showAnswer, n_question, n_correct } = this.state
        showAnswer = !showAnswer
        n_question = showAnswer ? n_question : n_question + 1
        n_correct = c ? n_correct + 1 : n_correct

        this.setState({
            showAnswer,
            n_question,
            n_correct
        })
    }

    render() {
        const { title, questions } = this.props.navigation.state.params
        const { showAnswer, n_question, n_correct } = this.state
        const all_question = questions.length

        if (n_question < all_question) {
            const { question, answer } = questions[n_question]
            return (
                <ScrollView contentContainerStyle={styles.container} >

                    <Text style={styles.question} >{question}</Text>

                    {showAnswer && (
                        <View>
                            <Text style={styles.answer} >{answer}</Text>
                            <ButtonResponse textStyle={styles.textStyle}
                                btnStyle={{ backgroundColor: green }} onPress={() => this.toggleShowAnswer(true)} text={"Acertou"}
                            />
                            <ButtonResponse textStyle={styles.textStyle}
                                btnStyle={{ backgroundColor: red }} onPress={() => this.toggleShowAnswer(false)} text={"Errou"}
                            />
                        </View>
                    )}

                    {!showAnswer && (
                        <ButtonResponse onPress={() => this.toggleShowAnswer()} text={"Ver resposta"} />
                    )}

                    <Text>{n_question + 1} de {all_question} perguntas</Text>

                </ScrollView>
            )
        }
        // (
        //     'Deck',
        //     { title }
        // )}
        else {
            console.log("QUIZ FIMMMM!!!!")
            return (
                <View style={styles_resume.container} >
                    <Text>{n_correct} / {all_question}</Text>
                    <Text>{Math.round(n_correct * 100 / all_question, 2)}%</Text>
                    <View>
                        <ButtonResponse text={"Refazer"} onPress={() => this.props.navigation.navigate(
                                'Quiz',
                                { title, questions: sort_array(questions) }
                            )}
                        />
                        <ButtonResponse
                            text={"Voltar ao baralho"} onPress={() => this.props.navigation.goBack() }
                        />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        padding: 30,
    },
    textStyle: {
        textShadowColor: black,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10
    },
    question: {
        fontSize: 30,
        marginVertical: 60,
        textAlign: 'center'
    },
    answer: {
        fontSize: 30,
        marginBottom: 60,
        textAlign: 'center'
    }
})

const styles_resume = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: white,
        marginVertical: 80,
        borderRadius: 10,
        paddingTop: 30,
        paddingBottom: 10
    }
})

export default Quiz