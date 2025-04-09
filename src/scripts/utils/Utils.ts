export const ORIGIN_FOLDER = 'data'
export const isVideo = (src: string) => {
  const re = /(?:\.([^.]+))?$/
  const ext = re.exec(src)?.[1]
  return ext === 'webm' || ext === 'mp4'
}

export const getVideoType = (imgSrc: string) => {
  if (imgSrc.endsWith('webm')) {
    return 'video/webm'
  } else if (imgSrc.endsWith('mp4')) {
    return 'video/mp4'
  }
  return 'video/mp4'
}

let gameReadyPromise: Promise<void> | undefined
export const getGame = async (): Promise<ReadyGame> => {
  if (game.ready) {
    console.debug('chat-images | game ready')
    return game
  }

  if (gameReadyPromise == null) {
    const {promise, resolve} = Promise.withResolvers<void>()
    Hooks.once('ready', () => {
      resolve()
    })

    gameReadyPromise = promise
  }

  await gameReadyPromise
  // @ts-ignore
  return game
}

export const localize = (text: string): string => game.i18n.localize(`CI.${text}`)
export const randomString = (): string => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

export const t = (text: string): string => game.i18n.localize(`CI.${text}`)

export const userCanUpload = (silent = false): boolean => {
  const isGM = game.user.isGM
  const userRole = game.user.role
  const FILE_UPLOAD_PERMISSIONS = game.permissions.FILES_UPLOAD

  const canUserUpload: boolean = isGM || game.permissions.FILES_UPLOAD.includes(userRole)

  if (!canUserUpload) {
    if (!silent) ui.notifications?.warn(t('uploadPermissions'))
    return false
  }

  return true
}
