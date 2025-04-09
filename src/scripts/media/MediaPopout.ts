/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import {getVideoType, isVideo} from '../utils/Utils'

/**
 * a
 */

type MediaPopoutOptions = {
  isVideo?: boolean,
  video: string,
  isMuted: boolean,
  isLoop: boolean,
  videoType: string
}
export class MediaPopout extends ImagePopout {
  video: boolean

  /**
   * Creates a MediaPopout specifically for uploading videos
   * @param src
   * @param options
   */
  constructor(src: string, options:Partial<ImagePopout.Options> = {}) {
    super(src, options)
    this.video = isVideo(src)
    this.options.template = 'modules/chat-images/templates/media-popout-dialog.hbs'
  }

  async getData(options: Partial<ImagePopout.Options>) {
    const data: any = await super.getData()

    data.isVideo = this.video
    if (this.video) {
      // @ts-ignore
      data.video = data.image
      data.isLoop = true
      data.isMuted = false
      data.videoType = getVideoType(data.video)
    }

    debugger
    return data
  }

  static _handleShareMedia = (url: string, title = '', loop = false, mute = true) => {
    const mediaPopout: any = new this(url, {
      title,
      shareable: false,
      editable: false,
    }).render(true)

    if (mediaPopout.video) {
      setTimeout(() => {
        const video = mediaPopout.element.find('video')[0]
        video.loop = loop
        video.muted = mute
        video.onended = loop ? null : () => mediaPopout.close(true)
        video.play().catch((e: Error) => {
          video.muted = true
          video.play()
        })
      }, 250)
    }
  }
}
