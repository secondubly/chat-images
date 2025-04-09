export const ORIGIN_FOLDER = 'data'
export const localize = (text: string): string => game.i18n.localize(`CI.${text}`)
export const randomString = (): string => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
let gameReadyPromise: Promise<void> | undefined

export const t = (text: string): string => game.i18n.localize(`CI.${text}`)

export const userCanUpload = async (silent = false): Promise<boolean> => {
  const isOwner = game.user.isOwner
  const userRole = game.user.role
  const FILE_UPLOAD_PERMISSIONS = game.permissions.FILES_UPLOAD

  const userCanUpload: boolean = isOwner || game.permissions.FILES_UPLOAD.includes(userRole)

  if (!userCanUpload) {
    if (!silent) ui.notifications?.warn(t('uploadPermissions'))
    return false
  }

  return true
}
