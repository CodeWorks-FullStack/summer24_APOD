import { AppState } from "../AppState.js";
import { Apod } from "../models/Apod.js";


// @ts-ignore
const nasaApi = new axios.create({
  baseURL: 'https://api.nasa.gov/planetary/',
  timeout: 5000
})

class NASAApodsService {
  async getApodByDate(selectedDate) {
    const response = await nasaApi.get(`apod?date=${selectedDate}&api_key=2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1`)
    console.log('🧑‍🚀📅📡', response.data);
    AppState.apod = new Apod(response.data) // class one object
  }
  async getAPod() {
    const response = await nasaApi.get('apod?api_key=2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1')
    console.log('🧑‍🚀📡', response.data);
    const newAPOD = new Apod(response.data) // class one object
    AppState.apod = newAPOD
    console.log(AppState.apod);
  }

}

export const nasaApodsService = new NASAApodsService()