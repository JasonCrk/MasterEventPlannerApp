import { getToken } from 'firebase/messaging'

import { messaging } from '../firebase'

import config from '../config'

export const getNotificationToken = async (): Promise<string> => {
  return getToken(messaging, {
    vapidKey: config.FIREBASE_KEY_PAIR_MESSAGING,
  }).then(token => token)
}
