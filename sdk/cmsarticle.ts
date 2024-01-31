import { cmsarticle, notify } from '..'
import { AppID } from './localapp'

const _cmsArticle = cmsarticle.useArticleStore()

export const getCMSContent = (contentURL: string, done?: (error: boolean, content?: string) => void) => {
  _cmsArticle.getContent({
    ContentURL: contentURL,
    Message: {
      Error: {
        Title: 'MSG_GET_CONTENT',
        Message: 'MSG_GET_CONTENT_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const cmsArticleContent = (contentURL: string) => _cmsArticle.articleContent(AppID.value, contentURL)
