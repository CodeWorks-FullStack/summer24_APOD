import { Apod } from './models/Apod.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null

  /** @type {Apod} */
  apod = null

  /** @type {Apod[]} */
  accountApods = []
}

export const AppState = createObservableProxy(new ObservableAppState())