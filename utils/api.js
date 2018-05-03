import { dummyData, DECKS_STORAGE_KEY, NOTIFICATION_KEY } from './helpers'
import { AsyncStorage } from 'react-native'

export function fetchDecks() {
    // AsyncStorage.clear()
    AsyncStorage.setItem(DECKS_STORAGE_KEY, dummyData)
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks) => {
            console.log(decks)
            return decks === null ? dummyData : JSON.parse(decks)
        })
}

export function saveDeck(title) {
    const deck = {
        [title]: {
            title,
            questions: []
        }
    }
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
        .then((e) => { console.log(e) })
}

export function saveCard(question, answer, title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks_json) => {
            const decks = JSON.parse(decks_json)
            console.log(decks)
            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    title,
                    questions: decks[title].questions.concat([{
                        question,
                        answer
                    }])
                }
            }))
        })
}

export function removeCardDB(question, title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks_json) => {
            const decks = JSON.parse(decks_json)
            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    title,
                    questions: decks[title].questions.filter(q => q.question !== question)
                }
            }))
        })
}


// export function submitEntry ({ entries, key }) {
//     return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//         [key]: entries
//     }))
// }