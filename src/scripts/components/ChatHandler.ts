/* eslint-disable require-jsdoc */
import {MediaPopout} from '../media/MediaPopout'
import {find, on} from '../utils/JqueryWrappers'

export class ChatHandler {
  static onPreCreateChatMessage(message: ChatMessage) {
    debugger
    console.debug(message)
  }

  static initChatMessage(chatMessage: JQuery) {
    const images = find('.ci-message-image img', chatMessage)
    if (images[0]) {
      const clickImageHandle = (evt: Event) => {
        const src = (evt.target as HTMLImageElement).src
        new ImagePopout(src, {editable: false, shareable: true}).render(true)
      }
      on(images, 'click', clickImageHandle)
    }
    const videos = find('.ci-media-image video', chatMessage)
    if (videos[0]) {
      const clickImageHandle = (evt: Event) => {
        const src = (evt.target as HTMLImageElement).src
        new MediaPopout(src, {editable: false, shareable: true}).render(true)
      }
      on(images, 'click', clickImageHandle)
    }
  }
}
