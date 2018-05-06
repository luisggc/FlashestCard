export const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY'
export const NOTIFICATION_KEY = 'NOTIFICATION_KEY'
import { Notifications, Permissions } from "expo"
import { AsyncStorage } from 'react-native';

export function createNotification() {
    return {
        title: 'Não esqueça de estudar!',
        body: "reinamento diário é fundamental para uma boa memorização",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}


export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

                        }
                    })
            }
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function sort_array(array) {
    return array.sort(function (a, b) { return 0.5 - Math.random() })
}

export const dummyData = {
    ['Inglês']: {
        title: 'Inglês',
        questions: [
            {
                question: 'O que é casa em inglês ?',
                answer: 'House'
            },
            {
                question: 'O que é chão em inglês ?',
                answer: 'Floor'
            },
            {
                question: 'O que é óculos em inglês ?',
                answer: 'Glasses'
            },
            {
                question: 'O que é computador em inglês ?',
                answer: 'Computer'
            }
        ]
    },
    ['Teologia']: {
        title: 'Teologia',
        questions: [
            {
                question: 'Quantas vezes Pedro negou Jesus ?',
                answer: '3'
            },
            {
                question: 'Sermão do Monte, um dos mais conhecidos sermões, começa em qual livro e capítulo ?',
                answer: 'Mateus 15'
            }
        ]
    }
}