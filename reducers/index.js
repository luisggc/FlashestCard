import { ADD_DECK, ADD_CARD, RECEIVE_CARD, REMOVE_CARD } from '../actions'

function reducer(state = {}, action) {
    const { title, question, answer, decks } = action

    switch (action.type) {

        case RECEIVE_CARD:
            return { decks }

        case ADD_DECK:
            return {
                ...state,
                "decks": {
                    ...state.decks,
                    [title]: {
                        title,
                        questions: []
                    }
                }
            }

        case ADD_CARD:
            return {
                ...state,
                "decks": {
                    ...state.decks,
                    [title]: {
                        title,
                        questions: state.decks[title].questions.concat([{
                            question,
                            answer
                        }])
                    }
                }
            }

        case REMOVE_CARD:
            return {
                ...state,
                "decks": {
                    ...state.decks,
                    [title]: {
                        title,
                        questions: state.decks[title].questions.filter(
                            q => q.question !== question)
                    }
                }
            }

        default:
            return { state }

    }
}

export default reducer
