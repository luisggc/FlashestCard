import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native'
import ButtonResponse from './layout/ButtonResponse'
import { green, red, white, black } from './../utils/colors';
import { sort_array, clearLocalNotification, setNotification } from './../utils/helpers';

class Quiz extends Component {

    state = {
        showAnswer: false,
        n_question: 0,
        n_correct: 0,
        spinValue: new Animated.Value(0),
    }

    flipCard = () => {
        this.state.spinValue.setValue(0)
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            }
        ).start()
    }

    static navigationOptions = ({ navigation }) => (
        {
            title: navigation.state.params.title
        }
    )

    toggleShowAnswer = (correct_answer) => {
        let { showAnswer, n_question, n_correct } = this.state
        showAnswer = !showAnswer
        n_question = showAnswer ? n_question : n_question + 1

        if (typeof correct_answer == 'undefined') {
            this.flipCard()
        } else {
            n_correct = correct_answer ? n_correct + 1 : n_correct
        }

        this.setState({
            showAnswer,
            n_question,
            n_correct,
        })
    }

    endquiz = () => {
        clearLocalNotification()
            .then(setNotification())
    }

    render() {
        const { title, questions } = this.props.navigation.state.params
        const { showAnswer, n_question, n_correct } = this.state
        const all_question = questions.length

        if (n_question < all_question) {
            const { question, answer } = questions[n_question]
            const spin = this.state.spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })
            return (
                <Animated.ScrollView contentContainerStyle={styles.container} style={{ transform: [{ rotateY: spin }] }} >

                    <Text style={styles.question} >{question}</Text>

                    {showAnswer && (
                        <View >
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

                </Animated.ScrollView>
            )
        }
        else {

            this.endquiz()
            const porcent = Math.round(n_correct * 100 / all_question, 2)

            return (
                <View style={styles_resume.container} >
                    <Text style={styles.emotion} >{porcent < 50 ? 'Uhhh, é necessário mais treino!' :
                        porcent > 70 ? 'Excelente !!' : 'Bom, mas treino nunca é demais!'}
                    </Text>
                    <View>
                        <Text style={{ fontSize: 60, textAlign: 'center' }} >{porcent}%</Text>
                        <Text style={{ fontSize: 20, textAlign: 'center' }} >{n_correct} / {all_question}</Text>
                    </View>
                    <View>
                        <ButtonResponse text={"Refazer"} onPress={() => this.props.navigation.navigate(
                            'Quiz',
                            { title, questions: sort_array(questions) }
                        )}
                        />
                        <ButtonResponse
                            text={"Voltar"} onPress={() => this.props.navigation.navigate(
                                'Deck',
                                { deck_title: this.props.navigation.state.params.title }
                            )}
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
    },
    emotion: {
        fontSize: 40,
        textAlign: 'center',
        marginHorizontal: 40,
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