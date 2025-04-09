import {ORIGIN_FOLDER, localize} from './Utils'
import {getGame} from './Utils'

export const createUploadFolder = async (uploadLocation?: string) => {
  console.debug('chat-images | create upload folder...')
  const location: string = uploadLocation || getUploadLocation()
  try {
    const folderLocation = await FilePicker.browse(ORIGIN_FOLDER, location)
    if (folderLocation.target === '.') await FilePicker.createDirectory(ORIGIN_FOLDER, location, {})
  } catch (e) {
    await FilePicker.createDirectory(ORIGIN_FOLDER, location, {})
  }
}


export const setSetting = async (key: string, value: string | boolean) => {
  const game = await getGame()

  switch (key) {
    case 'uploadLocation':
      game.settings.set('chat-images', 'uploadLocation', value)
      break
    case 'uploadButton':
      game.settings.set('chat-images', 'uploadButton', value)
      break
    default:
      break
  }
}

export const registerSettings = async () => {
  console.debug('chat-images | register settings...')
  const game = await getGame()
  game.settings.register('chat-images', 'uploadButton', {
    name: localize('uploadButton'),
    hint: localize('uploadButtonHint'),
    scope: 'client',
    type: Boolean,
    default: true,
    config: true,
    requiresReload: true,
  })

  game.settings.register('chat-images', 'uploadLocation', {
    name: localize('uploadLocation'),
    hint: localize('uploadLocationHint'),
    type: String,
    default: 'uploaded-chat-images',
    scope: 'world',
    config: true,
    onChange: async (newUploadLocation: string) => {
      const defaultLocation = 'uploaded-chat-images'
      let location = newUploadLocation.trim()
      let shouldChangeLocation = false

      if (!location) {
        location = defaultLocation
        shouldChangeLocation = true
      }

      location = location.replace(/\s+/g, '-')
      if (newUploadLocation !== location) shouldChangeLocation = true

      await createUploadFolder(location)
      if (shouldChangeLocation) await setSetting('uploadLocation', location)
    },
  })
}


export const getUploadLocation = (): string => {
  return game.settings.get('chat-images', 'uploadLocation')
}

export const getUploadButton = (): boolean => {
  return game.settings.get('chat-images', 'uploadButton')
}
