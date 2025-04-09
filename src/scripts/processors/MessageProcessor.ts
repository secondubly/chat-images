import {t} from '../utils/Utils'

const imageMarkdownReg = /!\s*ci\s*\|\s*(.+?)\s*!/gi
const imageReg = /\w+\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)/gi

const imageTemplate = (src: string): string => `<div class="ci-message-image"><img src="${src}" alt="${t('unableToLoadImage')}"></div>`
