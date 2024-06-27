import { AppState } from "../AppState.js";
import { nasaApodsService } from "../services/NASAApodsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class NASAApodsController {
  constructor() {
    console.log('🧑‍🚀🎮');
    this.getApod()
    // this.drawApod() this doesn't work because we don't know how long getApod takes
    AppState.on('apod', this.drawApod) // we have to listen for the data to "arrive" and draw then
    AppState.on('user', this.drawApod)
  }

  async getApod() {
    try {
      await nasaApodsService.getAPod()
    } catch (error) {
      console.error(error)
      Pop.toast('Could not retrieve APOD', 'error')
    } finally {
      console.log('Finally got that thing 🙄');
    }
  }

  async getApodByDate() {
    try {
      event.preventDefault()
      const form = event.target
      const selectedDate = form.date.value
      console.log('📅', selectedDate);
      await nasaApodsService.getApodByDate(selectedDate)
    } catch (error) {
      console.error(error)
      Pop.toast('Could not retrieve APOD', 'error')
    }
  }

  drawApod() {
    const apod = AppState.apod
    let apodHTML = `${apod.ApodDetailsTemplate}`
    setHTML('apod-details', apodHTML)
    document.body.style.backgroundImage = `url(${apod.imgUrl})`
  }
}