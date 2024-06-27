import { AppState } from "../AppState.js";
import { nasaApodsService } from "../services/NASAApodsService.js";
import { sandboxApodsService } from "../services/SandboxApodsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class SandboxApodsController {
  constructor() {
    AppState.on('user', () => console.log('user logged in'))
    AppState.on('user', this.getAccountApods)
    AppState.on('accountApods', this.drawAccountApodList)
    // this.getAccountApods() cannot get this on controller load, we have to wait for the user to be logged int
    console.log('🥪🎮');
  }

  async saveApod() {
    try {
      await sandboxApodsService.saveApod()
    } catch (error) {
      console.error(error)
      Pop.toast("Could not save APOD", 'error')
    }
  }

  async getAccountApods() {
    try {
      console.log('getting account apods');
      await sandboxApodsService.getAccountAPods()
    } catch (error) {
      console.error(error);
      Pop.toast("Could not get account apods", 'error')
    }
  }

  async getApodFromAccountList(apodDate) {
    try {
      if (apodDate.includes('/')) throw new Error("That's the wrong kind Date!!!")

      console.log(apodDate);
      await nasaApodsService.getApodByDate(apodDate)
    } catch (error) {
      console.error(error);
      Pop.toast("Could not relive the good ol' days", 'error')
    }
  }

  async deleteApod(apodId) {
    try {
      const choice = await Pop.confirm("are you sure about that?", 'This APOD with disappear', 'Boot it!', 'question')
      if (!choice) return

      await sandboxApodsService.deleteApod(apodId)
    } catch (error) {
      console.error(error);
      Pop.toast("Something went wrong, could not delete 🤷")
    }
  }

  drawAccountApodList() {
    console.log('🧑‍🎨🌠🌠🌠');
    const apods = AppState.accountApods
    let listHTML = ''
    apods.forEach(apod => listHTML += apod.ListApod)
    setHTML('apod-list', listHTML)
  }
}