import { article, notify } from '..'

const _article = article.useArticleStore()

export const getCMSContent = (contentURL: string, done?: (error: boolean, content?: string) => void) => {
  _article.getContent({
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

export const cmsArticleContent = (contentURL: string) => _article.articleContent(undefined, contentURL)
