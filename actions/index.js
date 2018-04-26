export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_CARD = 'RECEIVE_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'

export function receiveDecks (decks) {
    return{
        type: RECEIVE_CARD,
        decks
    }
}

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title
    }
}
//Title = Deck Title
export function addCard (question, answer, title) {
    return {
        type: ADD_CARD,
        question,
        answer,
        title
    }
}

export function removeCard (question, title) {
    return {
        type: REMOVE_CARD,
        question,
        title
    }
}

