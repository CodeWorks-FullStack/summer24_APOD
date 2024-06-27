import { AppState } from "../AppState.js"



export class Apod {
  constructor(data) {
    this.id = data.id
    this.imgUrl = data.imgUrl || data.hdurl
    this.description = data.description || data.explanation
    this.author = data.author || data.title
    this.date = data.date[11] == 'T' ? new Date(data.date.replaceAll('-', '/')) : new Date(data.date) // dashes vs slashes 😠 dashes here, put you one day behind
    // TODO creator sandbox details
  }

  get ApodDetailsTemplate() {
    // REVIEW style="background-image: url(${this.imgUrl})" IS NOT THE SOLUTION to getting a background image on the the whole page
    return `
<article>
  <div class="text-center secret-reveal"><i class="mdi mdi-information "></i></div>
  <div class="secret-area">
    <h1>${this.author}</h1>
    <p class="fw-bold">${this.PrettyDate}</p>
    <p>${this.description}</p>
    ${this.SaveButton}
  </div>
</article>
`
  }

  get ListApod() {
    return `
    <section class="row selectable" onclick="app.SandboxApodsController.getApodFromAccountList('${this.URLDate}')" data-bs-dismiss="offcanvas">
    <div class="col-4">
      <img src="${this.imgUrl}" class="apod-thumbnail"/>
    </div>
    <div class="col">
      ${this.ShortDate}
    </div>
    <button class="col-2 btn btn-outline-danger" onclick="app.SandboxApodsController.deleteApod('${this.id}')"><i class="mdi mdi-delete-forever"></i></div>
    </section>
    `
  }

  get PrettyDate() {
    return this.date.toLocaleString('en-us', { era: 'long', month: 'long', weekday: 'long', day: '2-digit' })
  }

  get ShortDate() {
    return this.date.toLocaleString('en-us', { year: '2-digit', month: '2-digit', day: '2-digit' })
  }

  get URLDate() {
    // console.log(this.date);
    return this.date.toLocaleString('en-uk', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-') // 🤮
  }

  get SaveButton() {
    if (AppState.user) {
      return `<button class="btn btn-outline-light" onclick="app.SandboxApodsController.saveApod()">savepod</button>`
    }
    return '<p>Log in to save</p>'
  }

}

/**
 * Convert this 
 * {
    "date": "2024-06-27",
    "explanation": "Jets of material blasting....",
    "hdurl": "https://apod.nasa.gov/apod/image/2406/STScI-SerpNorth.png",
    "media_type": "image",
    "service_version": "v1",
    "title": "Protostellar Outflows in Serpens",
    "url": "https://apod.nasa.gov/apod/image/2406/STScI-SerpNorth1024.png"
}
 *  to this ⬇️
 * 
 * date: String, required
imgUrl: String, required
creatorId: SchemaObjectId, required
*creator: Object (Virtual Added by Database)
description: String, 
author: Object, 
originalId: String, 
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database)
 */
