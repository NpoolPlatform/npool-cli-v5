export interface AppLang {
  ID: string
  AppID: string
  AppName: string
  LangID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
  Main: boolean
  CreatedAt: number
  UpdatedAt: number
}

export interface Message {
  ID: string
  AppName: string
  LangID: string
  Lang: string
  MessageID: string
  Message: string
  GetIndex: number
  Disabled: boolean
  CreatedAt: number
  UpdatedAt: number
}
