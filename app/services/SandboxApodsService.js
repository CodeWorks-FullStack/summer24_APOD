import { AppState } from "../AppState.js"
import { Apod } from "../models/Apod.js";
import { api } from "./AxiosService.js"





class SandboxApodsService {
  async saveApod() {
    const apodToSave = AppState.apod
    const response = await api.post('api/apods', apodToSave) // this changes the remote DB
    console.log('💾🌠📡', response.data);
    // AppState.emit('accountApods') this doesn't draw the new data, cause it's not in the array yet
    const savedApod = new Apod(response.data)
    AppState.accountApods.push(savedApod) // this changes the local STATE
  }

  async getAccountAPods() {
    const response = await api.get('api/apods')
    console.log('🥪🌠📡', response.data);
    let apods = response.data.map(apodData => new Apod(apodData)) // class an array of objects
    console.log('🌠🌠🌠🌠🌠', apods);
    AppState.accountApods = apods
  }

  async deleteApod(apodId) {
    const response = await api.delete(`api/apods/${apodId}`) // changed DB
    console.log('🔥🌠', response.data);
    const indexToRemove = AppState.accountApods.findIndex(apod => apod.id == apodId)
    AppState.accountApods.splice(indexToRemove, 1)
  }
}

export const sandboxApodsService = new SandboxApodsService()