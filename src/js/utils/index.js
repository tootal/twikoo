import timeago from './timeago'
import marked from './marked'
import call from './api'
import { isQQ, getQQAvatar } from './avatar'

const isNotSet = (option) => {
  return option === undefined || option === null || option === ''
}

const logger = {
  log: (message, e) => {
    console.log(`Twikoo: ${message}`, e)
  },
  info: (message, e) => {
    console.info(`Twikoo: ${message}`, e)
  },
  warn: (message, e) => {
    console.warn(`Twikoo: ${message}`, e)
  },
  error: (message, e) => {
    console.error(`Twikoo: ${message}`, e)
  }
}

const timestamp = (date = new Date()) => {
  return date.getTime()
}

const convertLink = (link) => {
  if (!link) return ''
  if (link.substring(0, 4) !== 'http') return `http://${link}`
  return link
}

// 云函数版本
let twikooFuncVer
const getFuncVer = async (tcb) => {
  if (!twikooFuncVer) {
    twikooFuncVer = await call(tcb, 'GET_FUNC_VERSION')
  }
  return twikooFuncVer
}

const getCommentsCountApi = async (tcb, options) => {
  if (!(options.urls instanceof Array)) {
    throw new Error('urls 参数有误')
  }
  if (options.urls.length === 0) {
    return []
  }
  const result = await call(tcb, 'GET_COMMENTS_COUNT', options)
  return result.result.data
}

const getRecentCommentsApi = async (tcb, options) => {
  const result = await call(tcb, 'GET_RECENT_COMMENTS', options)
  // 封装相对评论时间
  for (const comment of result.result.data) {
    comment.relativeTime = timeago(comment.created)
  }
  return result.result.data
}

export {
  isNotSet,
  logger,
  timeago,
  timestamp,
  convertLink,
  marked,
  call,
  getFuncVer,
  isQQ,
  getQQAvatar,
  getCommentsCountApi,
  getRecentCommentsApi
}
