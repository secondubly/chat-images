import './styles/chat-images.scss'
import {initUploadArea} from './scripts/components/UploadArea'
import {initUploadButton} from './scripts/components/UploadButton'
import {initChatSidebar} from './scripts/components/ChatSidebar'
import {ChatHandler} from './scripts/components/ChatHandler'
import {find} from './scripts/utils/JqueryWrappers'
// import {processMessage} from './scripts/processors/MessageProcessor'
import {createUploadFolder, registerSettings} from './scripts/utils/Settings'
// import {ChatResolver} from './scripts/components/ChatResolver'

Hooks.once('init', async () => {
  console.log('chat-images | initializing...')
  await registerSettings()
  await createUploadFolder()
})

Hooks.on('renderSidebarTab', (_0: never, sidebar: JQuery) => {
  console.log('chat-images | render sidebar tab...')
  const sidebarElement: HTMLElement | null = sidebar[0]
  if (!sidebarElement) return

  const hasChatElement = sidebarElement.querySelector('#chat-message')
  if (!hasChatElement) return

  initUploadArea(sidebar)
  initUploadButton(sidebar)
  initChatSidebar(sidebar)
})

Hooks.on('renderChatMessage', (_0: never, chatMessage: JQuery) => {
  const ciMessage = find('.ci-message-image', chatMessage)
  if (!ciMessage[0]) return

  ChatHandler.initChatMessage(chatMessage)
})

Hooks.on('preCreateChatMessage', (chatMessage: ChatMessage, html: JQuery, messageData: any) => {
  ChatHandler.onPreCreateChatMessage(chatMessage)
})
